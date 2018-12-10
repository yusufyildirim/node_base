const { Model } = require('objection');

class QB extends Model.QueryBuilder {
}
class BaseModel extends Model {
  static get QueryBuilder() {
    return QB;
  }
}

module.exports = BaseModel;
