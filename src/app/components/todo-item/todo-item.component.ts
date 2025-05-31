import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from '../../interfaces/todo.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  @Input() todo!: ITodo;
  @Output() delete = new EventEmitter<string>();

  toggleTodo(todo: ITodo) {
    todo.completed = !todo.completed;
    todo.updatedAt = new Date();
  }

  onDelete() {
    this.delete.emit(this.todo.id);
  }
}
