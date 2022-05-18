import sha from "sha1";

export default class HSanari
{

  static #ini = undefined;

  constructor()
  {}

  sayHello(name)
  {
    return `Hello ${name}`;
  }
  
  sha(value)
  {
    const key = "very-safe";
    if (typeof value !== "string") {
      value = "";
    }
    return sha(`${sha(key)}${value}`);
  };

  static setup()
  {
    if (!this.#ini) {
      this.#ini = new HSanari();
    }
    return this.#ini;
  }
}