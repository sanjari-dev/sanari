
export default class Schema
{
  
  #_data = {};

  constructor()
  {}

  get(data)
  {
    const _data = {};
    const keys_data = Object.keys(this.#_data);
    for (let i = 0; i < keys_data.length; i++) {
      _data[keys_data[i]] = this.#_data[keys_data[i]];
      if (data) {
        _data[keys_data[i]] = data[keys_data[i]];
      }
    }
    return _data;
  }

  list(data = "")
  {
    const ls = [];
    for (let i = 0; i < (data === "" ? 1 : data.length); i++) {
      ls.push(this.get(data === "" ? undefined : data[i]));
    }
    return ls;
  }

  /**
   * @param {{}} args
   */
  set data(args){
    this.#_data = args;
  }
}