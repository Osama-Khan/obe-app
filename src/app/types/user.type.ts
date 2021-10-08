import DbEntity from './db-entity.type';

type UserType = DbEntity & {
  username: string;
  email: string;
  dateOfBirth: Date;
};

export default UserType;
