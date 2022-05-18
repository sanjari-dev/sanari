

export default class Repository
{
  #_model = undefined;

  constructor()
  {}

  async all(query, option = {}, include = [])
  {
    const sequelize = db[Object.keys(db)[0]].Sequelize;
    option.include = include;
    if (query.trash === "true") {
      option.paranoid = false;
      if (!Object.keys(option).find(x => x === "where")) {
        option.where = {};
      }
      option.where.deletedAt = {
        [sequelize.Op.not]: null
      }
    }
    if (query.all === "true") {
      option.paranoid = false;
      if (!Object.keys(option).find(x => x === "where")) {
        option.where = {};
      }
      option.where.deletedAt = {
        [sequelize.Op.or] : {
          [sequelize.Op.not]: null,
          [sequelize.Op.is]: null
        }
      }
    }
    const data = await this.#_model.findAll(option);
    return data;
  }

  async add(body, schema)
  {
    const sequelize = db[Object.keys(db)[0]].Sequelize;
    const _body = schema.body(body);
    
    return _body;
  }

  /**
   * @param {any} args
   */
  set model(args){this.#_model = args};
}