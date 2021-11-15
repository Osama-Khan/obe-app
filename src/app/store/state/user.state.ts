import UserModel from '@app/models/user';

export interface IUserState {
  userData?: UserModel;
  token?: string;
}

export default class UserState implements IUserState {
  userData?: UserModel;
  token?: string;

  constructor(obj?: Partial<UserState>) {
    this.userData = obj?.userData;
    if (obj) {
      this.token = obj.token;
    }
  }

  /** Initializes a User from server JSON response. */
  static fromJson(data: any) {
    const user = new UserState(data);
    if (user.userData)
      user.userData.dateOfBirth = new Date(user.userData.dateOfBirth);
    return user;
  }
}
