import { Exclude } from 'class-transformer';

export class UserSchema {
  id: number;
  username: string;
  email: string;
  @Exclude()
  hash: string;
}
