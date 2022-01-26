import UserType from './user.type';
import DbEntity from './db-entity.type';

type RoleType = DbEntity & {
  name: string;
  users?: UserType[];
};

export default RoleType;
