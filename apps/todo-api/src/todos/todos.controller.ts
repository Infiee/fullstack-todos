import { Controller } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import '@ts-rest/core';
import { contract } from 'shared-api';

@Controller()
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @TsRestHandler(contract.todos)
  async handler() {
    return tsRestHandler(contract.todos, {
      create: async ({ body }) => {
        return {
          status: 201,
          body: this.todosService.create(body),
        };
      },
      getAll: async ({ query: { title } }) => {
        return {
          status: 200,
          body: this.todosService.getAll(title),
        };
      },
      getOne: async ({ params: { id } }) => {
        const item = await this.todosService.getOne(id);
        if (!item) {
          return {
            status: 404,
            body: {
              message: '没有item',
            },
          };
        }
        return {
          status: 200,
          body: item,
        };
      },
      update: async ({ params: { id }, body }) => {
        const item = await this.todosService.update(id, body);
        if (!item) {
          return {
            status: 404,
            body: {
              message: '没有item',
            },
          };
        }
        return {
          status: 200,
          body: item,
        };
      },
      remove: async ({ params: { id } }) => {
        const item = await this.todosService.remove(id);
        if (!item) {
          return {
            status: 404,
            body: {
              message: '没有item',
            },
          };
        }
        return {
          status: 204,
          body: item,
        };
      },
    });
  }
}
