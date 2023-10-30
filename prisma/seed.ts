import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  let activitie = await prisma.activities.findFirst();
  
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driven.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  if (!activitie) {
    const startsAt = dayjs('2023-10-30T09:00:00');
    
    activitie = await prisma.activities.create({
      data: {
        eventId: event.id,
        name: "Aula de JS",
        places: 10,
        startsAt: startsAt.toDate(),
        endsAt: startsAt.add(1, "hours").toDate(),
        local: "Auditório principal"
      }
    });
  }

  console.log({ event, activitie });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
