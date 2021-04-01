import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import BaseIndex from '../base/base-index';
import IndexInterface from '../base/index-interface';
import Cart from './cart-model';
import CartSchema from './cart-schema';
import CartService from './cart-service';

/**
 *
 *
 * @export
 * @class CartIndex
 * @extends {BaseIndex}
 * @implements {IndexInterface}
 */
export default class CartIndex extends BaseIndex implements IndexInterface {
  /**
   *
   *
   * @protected
   * @param {FastifyInstance} fastifyInstance
   * @memberof CartIndex
   */
  protected initialize(fastifyInstance: FastifyInstance) {
    this.fastifyInstance = fastifyInstance;
    this.schema = new CartSchema();
    this.service = CartService.Instance(Cart, fastifyInstance, this.schema);
    this.prefixValue = 'carts';
  }

  /**
   *
   *
   * @protected
   * @memberof CartIndex
   */
  protected register(): void {
    super.register();
    this.registerChildrenCrudRoutes();
  }

  /**
   *
   *
   * @protected
   * @memberof CartIndex
   */
  protected registerChildrenCrudRoutes() {
    this.fastifyInstance.post(
        `${this.prefix}/:id/products/:product_id`,
        { schema: this.schema.addProductSchema },
        async (request: FastifyRequest, reply: FastifyReply) => this.addProduct(request, reply),
    );
    this.fastifyInstance.put(
        `${this.prefix}/:id/products/:product_id`,
        { schema: this.schema.addProductSchema },
        async (request: FastifyRequest, reply: FastifyReply) => this.editProduct(request, reply),
    );
    this.fastifyInstance.delete(
        `${this.prefix}/:id/products/:product_id`,
        { schema: this.schema.removeProductSchema },
        async (request: FastifyRequest, reply: FastifyReply) => this.removeProduct(request, reply),
    );
  }

  /**
   *
   *
   * @protected
   * @memberof CartIndex
   */
  protected registerCrudRoutes() {
    this.fastifyInstance.post(
        this.prefix,
        { schema: this.schema.createSchema },
        async (request: FastifyRequest, reply: FastifyReply) => this.create(request, reply),
    );
    this.fastifyInstance.get(
        this.prefix,
        { schema: this.schema.getAllSchema },
        async (request: FastifyRequest, reply: FastifyReply) => this.index(request, reply),
    );
    this.fastifyInstance.get(
        `${this.prefix}/:id`,
        { schema: this.schema.getOneSchema },
        async (request: FastifyRequest, reply: FastifyReply) => this.show(request, reply),
    );
    this.fastifyInstance.delete(
        `${this.prefix}/:id`,
        { schema: this.schema.deleteSchema },
        async (request: FastifyRequest, reply: FastifyReply) => this.delete(request, reply),
    );
  }

  /**
   *
   *
   * @param {*} request
   * @param {FastifyReply} reply
   * @return {FastifyReply}
   * @memberof CartIndex
   */
  public async addProduct(request: any, reply: FastifyReply) {
    const resp = await this.service.addProduct(
        request.params.id,
        request.params.product_id,
        request.body,
        reply,
    );
    return reply.code(200).send(resp);
  }

  /**
   *
   *
   * @param {*} request
   * @param {FastifyReply} reply
   * @return {FastifyReply}
   * @memberof CartIndex
   */
  public async removeProduct(request: any, reply: FastifyReply) {
    const resp = await this.service.removeProduct(
        request.params.id,
        request.params.product_id,
        reply,
    );
    return reply.code(200).send(resp);
  }

  /**
   *
   *
   * @param {*} request
   * @param {FastifyReply} reply
   * @return {FastifyReply}
   * @memberof CartIndex
   */
  public async editProduct(request: any, reply: FastifyReply) {
    const resp = await this.service.addProduct(
        request.params.id,
        request.params.product_id,
        request.body,
        reply,
    );
    return reply.code(200).send(resp);
  }
}
