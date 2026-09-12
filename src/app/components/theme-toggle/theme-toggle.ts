import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  standalone: false,
  styleUrl: './theme-toggle.scss',
  templateUrl: './theme-toggle.html',
})
export class ThemeToggle {
  isDarkMode = false;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    // Acessa a tag <html> e adiciona ou remove o atributo data-theme='dark'
    if (this.isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }
}
