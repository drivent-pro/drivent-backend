import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { hotelsService } from '@/services';
import { redis } from '@/config';

const DEFAULT_EXPIRATION = 120;

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const cache = await redis.get('hotels');
  if (cache) {
    return res.status(httpStatus.OK).send(JSON.parse(cache));
  }

  const { userId } = req;

  const hotels = await hotelsService.getHotels(userId);
  await redis.set('event', JSON.stringify(hotels), 'EX', DEFAULT_EXPIRATION);
  res.status(httpStatus.OK).send(hotels);
}

export async function getHotelsWithRooms(req: AuthenticatedRequest, res: Response) {
  const cache = await redis.get('hotelWithRooms');

  if (cache) {
    return res.status(httpStatus.OK).send(JSON.parse(cache));
  }

  const { userId } = req;
  const hotelId = Number(req.params.hotelId);

  const hotelWithRooms = await hotelsService.getHotelsWithRooms(userId, hotelId);
  await redis.set('hotelWithRooms', JSON.stringify(hotelWithRooms), 'EX', DEFAULT_EXPIRATION);
  res.status(httpStatus.OK).send(hotelWithRooms);
}
