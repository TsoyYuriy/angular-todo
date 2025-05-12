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

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  todo = new FormControl<string | null>('', [Validators.required]);
  errorMessage: WritableSignal<string | null> = signal(null);
  private subscriptions = new Subscription();
  todos: ITodo[] = [];

  ngOnInit(): void {
    this.subscriptions.add(this.resetErrorMessage());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
}
