import { Request } from 'express';

import { IUser } from '../modules/user/types/user.type';

export class RequestWithUserData extends Request {
  user: IUser;
}
