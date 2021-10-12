import UserType from '@app/types/user.type';

export default class UserModel implements UserType {
  id: string;
  username: string;
  email: string;
  dateOfBirth: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(data: UserType) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.dateOfBirth = data.dateOfBirth;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.deletedAt = data.deletedAt;
  }
}
