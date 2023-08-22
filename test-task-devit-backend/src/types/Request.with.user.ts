import { Request } from 'express';

export class RequestWithUserData extends Request {
  user: {
    username: string;
    id: number;
  };
}
