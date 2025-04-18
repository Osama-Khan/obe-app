import {FindConditions, FindConditionSet} from './Conditions';
import FindOperator from './Operators';
import {FindManyOptions, FindOneOptions} from './Options';

export class Criteria<Entity> {
  protected _criteria: FindOneOptions<Entity> = {};

  constructor(criteria?: Partial<FindOneOptions<Entity>>) {
    this._criteria = {...this._criteria, ...criteria};
  }

  get body() {
    return this._criteria;
  }

  addCondition = (
    key: keyof Entity,
    value: string,
    operator?: FindOperator,
  ) => {
    const cond = new FindConditions<Entity>({
      key,
      value,
      operator: operator || '=',
    });
    !this._criteria.where && (this._criteria.where = []);
    this._criteria.where.push([cond]);
  };

  addConditionSet = (set: FindConditionSet<Entity>) => {
    !this._criteria.where && (this._criteria.where = []);
    this._criteria.where.push(set.conditions);
  };

  addRelation = (name: keyof Entity) => {
    if (this.hasRelation(name)) return false;
    !this._criteria.relations && (this._criteria.relations = []);
    return this._criteria.relations.push(name.toString());
  };

  hasRelation = (name: keyof Entity) =>
    this._criteria.relations?.find(r => r === name.toString());

  removeRelation = (name: keyof Entity) => {
    if (!this._criteria.relations) return false;
    if (!this.hasRelation(name)) return false;
    return this._criteria.relations.filter(r => r !== name.toString());
  };

  addSelect = (name: keyof Entity) => {
    if (this.hasSelect(name)) return false;
    !this._criteria.select && (this._criteria.select = []);
    return this._criteria.select.push(name.toString() as keyof Entity);
  };

  hasSelect = (name: keyof Entity) =>
    this._criteria.select?.find(r => r === name.toString());

  removeSelect = (name: keyof Entity) => {
    if (!this._criteria.select) return false;
    if (!this.hasSelect(name)) return false;
    return this._criteria.select.filter(r => r !== name.toString());
  };

  setOrder = (by: keyof Entity, as: 'ASC' | 'DESC') => {
    this._criteria.order = {};
    this._criteria.order[by] = as;
  };
}

export class ManyCriteria<Entity> extends Criteria<Entity> {
  protected _criteria: FindManyOptions<Entity> = {};

  constructor(criteria?: FindManyOptions<Entity>) {
    super();
    this._criteria = {...this._criteria, ...criteria};
  }

  setLimit = (limit: number) => {
    this._criteria.take = limit;
  };

  setOffset = (offset: number) => {
    this._criteria.skip = offset;
  };
}
