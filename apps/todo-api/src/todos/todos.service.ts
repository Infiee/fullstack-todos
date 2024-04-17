import { Injectable } from '@nestjs/common';
import { Todo, UpdateTodoDto } from 'shared-api';

@Injectable()
export class TodosService {
  todos: Todo[] = [
    {
      id: Date.now(),
      title: '今日目标',
      description: '好好学习，天天向上',
      completed: false,
    },
  ];

  create(todo: Omit<Todo, 'id'>) {
    const newTodo = {
      ...todo,
      id: Date.now(),
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  getAll(title?: string) {
    if (title) {
      return this.todos.filter((todo) =>
        todo.title.toLowerCase().includes(title.toLowerCase()),
      );
    }
    return this.todos;
  }

  getOne(id: number) {
    return this.todos.find((todo) => todo.id === id);
  }

  // update(id: number, dto: Partial<Todo>) {
  update(id: number, dto: UpdateTodoDto) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      return null;
    }
    this.todos[index] = { ...this.todos[index], ...dto };
    return this.todos[index];
  }

  remove(id: number) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      return null;
    }
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return {};
  }
}
