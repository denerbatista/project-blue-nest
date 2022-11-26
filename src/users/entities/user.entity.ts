import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUser extends UpdateUserDto {
  id: string;
}
