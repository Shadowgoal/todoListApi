import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {

  constructor(@InjectRepository(Todo) private todosRepository: Repository<Todo>) {}

  async getTodos(): Promise<Todo[]> {
    return await this.todosRepository.find();
  };

  async getOneTodo(todo: Todo) {
    return await this.todosRepository.findOne(todo);
  }

  async createTodo(todo: Todo) {
    return this.todosRepository.insert(todo);
  };

  async updateTodo(id: number, todo: Todo) {
    return this.todosRepository.update(id, todo);
  };

  async deleteTodo(todo: Todo) {
    this.todosRepository.delete(todo);
  };

  async deleteAll() {
    this.todosRepository.clear();
  }
}
