import ModelInterface from './model-interface';

/**
 *
 *
 * @export
 * @class BaseModel
 * @implements {ModelInterface}
 */
export default class BaseModel implements ModelInterface {
  public _id!: string;

  /**
   *
   *
   * @readonly
   * @type {string}
   * @memberof BaseModel
   */
  get id(): string {
    return this._id;
  }
}
