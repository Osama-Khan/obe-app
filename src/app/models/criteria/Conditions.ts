import FindOperator from './Operators';

export interface IFindConditions<T> {
  key: keyof T;
  operator: FindOperator;
  value: string | {[key: string]: string};
}

export class FindConditions<T> implements IFindConditions<T> {
  key: keyof T;
  operator: FindOperator = '=';
  value: string | {[key: string]: string};
  constructor(where: IFindConditions<T>) {
    this.key = where.key;
    where.operator && (this.operator = where.operator);
    this.value = where.value;
  }
}
