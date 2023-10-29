import { Router } from 'express';

import { createUserSchema } from '@/schemas';
import { validateBody } from '@/middlewares';
import { getInfoByUser, usersPost } from '@/controllers';

const usersRouter = Router();

usersRouter.post('/', validateBody(createUserSchema), usersPost);
usersRouter.get('/especify/:userData', getInfoByUser);

export { usersRouter };
