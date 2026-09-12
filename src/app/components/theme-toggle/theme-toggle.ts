import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  standalone: false,
  styleUrl: './theme-toggle.scss',
  templateUrl: './theme-toggle.html',
})
export class ThemeToggle implements OnInit {
  isDarkMode = false;

  // OnInit: chamado uma vez quando o componente é criado.
  // É o lugar certo para ler o localStorage — o DOM já existe.
  ngOnInit(): void {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      this.isDarkMode = true;
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');   // persiste a escolha
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');  // persiste a escolha
    }
  }
}
