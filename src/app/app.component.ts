import { Todo } from './models/todo.model';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: Todo[] = [];
  public title = 'TODO LIST';

  public form;

  public modal;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
    });

    this.load();
  }

  public remove(todo: Todo): void {
    const index = this.todos.indexOf(todo);

    if (index !== -1) {
      this.todos.splice(index, 1);
    }

    this.save();
  }

  public add(): void {
    const title = this.form.controls.title.value;
    const index = this.todos.length + 1;

    this.todos.push(new Todo(index, title, false));

    this.save();
    this.clear();
  }

  public clear(): void {
    this.form.reset();

    this.save();
  }

  public markAsDone(todo: Todo): void {
    todo.concluido = true;

    this.save();
  }

  public markAsUndone(todo: Todo): void {
    todo.concluido = false;

    this.save();
  }

  public save(): void {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);

    this.modal = false;
  }

  public load(): void {
    const data = localStorage.getItem('todos');

    if (data) {
      this.todos = JSON.parse(data);
      this.modal = false;
    } else {
      this.todos = [];
      this.modal = true;
    }
  }

  public addTarefa(): void {
    this.modal = true;
  }
}
