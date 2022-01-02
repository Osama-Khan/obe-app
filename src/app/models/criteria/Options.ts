import {FindConditions} from './Conditions';

/** Type ORM based interface to find one entity */
export interface FindOneOptions<Entity> {
  /**
   * Specifies what columns should be retrieved.
   */
  select?: (keyof Entity)[];
  /**
   * Simple condition that should be applied to match entities.
   */
  where?: FindConditions<Entity>[][];
  /**
   * Indicates what relations of entities should be loaded.
   */
  relations?: string[];
  /**
   * Order of entities.
   */
  order?: {
    [P in keyof Entity]?: 'ASC' | 'DESC' | 1 | -1;
  };
}

/** Type ORM based interface to find multipl entities */
export interface FindManyOptions<Entity> extends FindOneOptions<Entity> {
  /**
   * Number to start fetching entities from.
   */
  skip?: number;
  /**
   * Number of entities to fetch.
   */
  take?: number;
}
