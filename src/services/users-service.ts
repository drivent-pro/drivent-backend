import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { eventsService } from '@/services';
import { cannotEnrollBeforeStartDateError, duplicatedEmailError } from '@/errors';
import { bookingRepository, enrollmentRepository, hotelRepository, paymentsRepository, ticketsRepository, userRepository } from '@/repositories';

export async function createUser({ email, password }: CreateUserParams): Promise<User> {
  await canEnrollOrFail();

  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    password: hashedPassword,
  });
}

export async function getInfoByUser(user: any) {
  const infoByUser = await userRepository.getInfoByUser(user);
  const infoByEnrollment = await enrollmentRepository.findWithAddressByUserId(infoByUser.id);
  if (infoByEnrollment === null || !infoByEnrollment.id) {
    return infoByUser
  }
  const infoByTicket = await ticketsRepository.findTicketByEnrollmentId(infoByEnrollment.id);
  const infoByPayment = await paymentsRepository.findPaymentByTicketId(infoByTicket.id);
  if (infoByTicket.TicketType.includesHotel === false) {
    return {
      infoByUser,
      infoByEnrollment,
      infoByTicket,
      infoByPayment
    }
  }
  const infoByBooking = await bookingRepository.findByUserId(infoByUser.id);
  return {
    infoByUser,
    infoByEnrollment,
    infoByTicket,
    infoByPayment,
    infoByBooking
  };
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

async function canEnrollOrFail() {
  const canEnroll = await eventsService.isCurrentEventActive();
  if (!canEnroll) {
    throw cannotEnrollBeforeStartDateError();
  }
}

export type CreateUserParams = Pick<User, 'email' | 'password'>;

export const userService = {
  createUser,
  getInfoByUser
};
