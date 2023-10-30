import { Router } from 'express';
import { getActivites } from '@/controllers/activities-controller';

const activitiesRouter = Router();

activitiesRouter.get('/', getActivites);

export { activitiesRouter };
