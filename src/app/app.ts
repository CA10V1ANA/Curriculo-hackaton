import { Component, signal } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('curriculo-viana');
}
