import { FastifyReply, FastifyRequest } from 'fastify';

// import BaseSchema from './base-schema';

export default interface IndexInterface {

    create(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;

    index(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;

    show(request: any, reply: FastifyReply): Promise<FastifyReply>;

    update(request: any, reply: FastifyReply): Promise<FastifyReply>;

    delete(request: any, reply: FastifyReply): Promise<FastifyReply>;
}
