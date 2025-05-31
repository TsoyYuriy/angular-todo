import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoEmptyComponent } from './todo-empty.component';

describe('TodoEmptyComponent', () => {
  let component: TodoEmptyComponent;
  let fixture: ComponentFixture<TodoEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoEmptyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
