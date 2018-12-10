import { Model } from 'objection';

class QB extends Model.QueryBuilder {
}

export default class BaseModel extends Model {
  static get QueryBuilder() {
    return QB;
  }
}
