import RoleType from '@app/types/role.type';
import UserType from '@app/types/user.type';

export default class UserModel implements UserType {
  id: string;
  username: string;
  email: string;
  dateOfBirth: Date;
  role?: RoleType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(data: UserType) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.dateOfBirth = data.dateOfBirth;
    this.role = data.role;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.deletedAt = data.deletedAt;
  }
}
