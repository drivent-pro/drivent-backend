import { prisma } from '@/config';

async function getActivites() {
    return prisma.activities.findMany({
        orderBy: {
            startsAt: 'asc'
        }
    });
}

export const activitiesRepository = {
    getActivites
}