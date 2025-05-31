import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ITodo } from './interfaces/todo.interface';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoEmptyComponent } from './components/todo-empty/todo-empty.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    CommonModule,
    TodoItemComponent,
    TodoEmptyComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  todo = new FormControl<string | null>('', [Validators.required]);
  errorMessage: WritableSignal<string | null> = signal(null);
  private subscriptions = new Subscription();
  todos: ITodo[] = [
    {
      id: uuidv4(),
      title:
        'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  ngOnInit(): void {
    this.subscriptions.add(this.resetErrorMessage());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get hasTodos(): boolean {
    return this.todos.length > 0;
  }

  get completedTodos(): number {
    return this.todos.filter((todo) => todo.completed).length;
  }

  addTodo(): void {
    if (this.todo.invalid) {
      this.errorMessage.set('Это поле обязательно для заполнения');
      return;
    }
    const todoValue = this.todo.value;
    if (todoValue) {
      const newTodo = {
        id: uuidv4(),
        title: todoValue,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.todos.push(newTodo);
      this.todo.reset();
    }
  }

  resetErrorMessage(): Subscription {
    return this.todo.valueChanges.subscribe(() => {
      if (!this.todo.invalid) {
        this.errorMessage.set(null);
      }
    });
  }

  deleteTodo(todoId: string) {
    const index = this.todos.findIndex((t) => t.id === todoId);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }
}
