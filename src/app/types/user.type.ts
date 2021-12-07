import AllocationType from './allocation.type';
import DbEntity from './db-entity.type';
import RoleType from './role.type';
import SectionType from './section.type';

type UserType = DbEntity & {
  username: string;
  email: string;
  dateOfBirth: Date;
  role?: RoleType;
  sections?: SectionType[];
  allocations?: AllocationType[];
};

export default UserType;
