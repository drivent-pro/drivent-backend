import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { authenticationService, SignInParams } from '@/services';
import fetch from 'node-fetch';

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  const result = await authenticationService.signIn({ email, password });

  return res.status(httpStatus.OK).send(result);
}


export async function getAccessToken(req: Request, res: Response) {
  try {
    const code = req.query.code;
    const params = `?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`;

    const response = await fetch(`https://github.com/login/oauth/access_token${params}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return res.status(httpStatus.OK).json(data);
    } else {
      const errorData = await response.json();
      return res.status(response.status).json('Erro ao obter o token de acesso do GitHub');
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
  }
}
