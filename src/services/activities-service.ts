import { activitiesRepository } from "@/repositories"

async function getActivites(){
    const activities = await activitiesRepository.getActivites();
    return activities;
}

export const activitiesService = {
    getActivites
}