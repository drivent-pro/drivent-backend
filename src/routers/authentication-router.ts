import { Router } from 'express';
import { singInPost, getAccessToken } from '@/controllers';
import { validateBody } from '@/middlewares';
import { signInSchema } from '@/schemas';

const authenticationRouter = Router();

authenticationRouter.post('/sign-in', validateBody(signInSchema), singInPost);
authenticationRouter.get('/acess-token',getAccessToken);

export { authenticationRouter };
