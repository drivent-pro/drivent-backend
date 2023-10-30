import { activitiesService } from '@/services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getActivites(req: Request, res: Response){
    const activities = await activitiesService.getActivites();

    res.status(httpStatus.OK).send(activities);
}