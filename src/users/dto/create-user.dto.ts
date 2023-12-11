import { Roles } from '../../shared/types/Roles';

export interface CreateUserDto {
  username: string;
  password: string;
  role: Roles;
}
