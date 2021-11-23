import SectionType from './section.type';
import DbEntity from './db-entity.type';

export type ActivityTypeType = DbEntity & {
  /** Name of the activity type */
  name: string;

  /** The activities that are of this type */
  activities: ActivityType[];
};

export type ActivityType = DbEntity & {
  /** Title of the activity */
  title: string;

  /** A bit longer description of the activity */
  description: string;

  /** Type of the activity */
  type: ActivityTypeType;

  /** The section this activity has been assigned to */
  section: SectionType;
};
