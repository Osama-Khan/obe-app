import FindOperator from './Operators';

export interface IFindConditions<T> {
  key: keyof T;
  operator?: FindOperator;
  value: string | {[key: string]: string};
}

export class FindConditions<T> implements IFindConditions<T> {
  key: keyof T;
  operator?: FindOperator = '=';
  value: string | {[key: string]: string};
  constructor(where: IFindConditions<T>) {
    this.key = where.key;
    where.operator && (this.operator = where.operator);
    this.value = where.value;
  }
}

/** Class that adds multiple conditions to a criteria*/
export class FindConditionSet<T> {
  private _conditions: FindConditions<T>[] = [];

  /** Add a condition to the set */
  add(
    key: keyof T,
    value: string | {[key: string]: string},
    operator?: FindOperator,
  ) {
    if (this._conditions.find(c => c.key === key)) {
      return false;
    }
    this._conditions.push(new FindConditions({key, value, operator}));
    return true;
  }

  /** Remove a condition from the set */
  remove(key: keyof T) {
    const prevLength = this._conditions.length;
    this._conditions = this._conditions.filter(c => c.key === key);
    return this._conditions.length < prevLength;
  }

  /** Gets the conditions as a FindConditions array */
  get conditions() {
    return this._conditions;
  }
}
