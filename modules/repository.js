

export default class Repository
{
  #_model = undefined;

  constructor()
  {}

  async all(query, option = {}, include = [], scope = "")
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
    let data = {};
    try {
      data = await this.#_model.scope(scope).findAll(option);
    }
    catch (err) {
      data = await this.#_model.findAll(option);
    }
    return data;
  }

  async add(body, user)
  {
    // last
    const last = await this.#_model.findOne({
      order: [
        ['id', 'DESC']
      ],
      paranoid: false
    });

    // set id
    body.id = last ? last.id + 1 : 1;
    body.createdBy = user.id;
    body.updatedBy = user.id;
    
    // create body
    return await this.#_model.create(body);
  }

  /**
   * @param {any} args
   */
  set model(args){this.#_model = args};
}