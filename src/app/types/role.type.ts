import {UserType} from '.';
import DbEntity from './db-entity.type';

type RoleType = DbEntity & {
  name: string;
  users?: UserType[];
};

export default RoleType;
