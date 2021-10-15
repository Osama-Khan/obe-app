import DbEntity from './db-entity.type';
import RoleType from './role.type';

type UserType = DbEntity & {
  username: string;
  email: string;
  dateOfBirth: Date;
  role?: RoleType;
};

export default UserType;
