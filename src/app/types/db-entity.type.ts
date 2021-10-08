/** Represents the common properties of a database entity */
type DbEntity = {
  /** ID of the entity */
  id: string;

  /** Creation date of the entity */
  createdAt: Date;

  /** Date the entity was last updated on */
  updatedAt: Date;

  /** Date when the entity was deleted (soft delete) */
  deletedAt: Date;
};

export default DbEntity;
