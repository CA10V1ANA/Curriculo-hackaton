import { Component } from '@angular/core';

interface AboutCard {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: false,
  styleUrl: './about.scss',
  templateUrl: './about.html',
})
export class About {
  cards: AboutCard[] = [
    {
      icon: '</>',
      title: 'Full Stack Development',
      description: 'Construo soluções completas, do banco de dados à interface, com foco em performance e código limpo.'
    },
    {
      icon: '🎓',
      title: 'Formação Sólida',
      description: 'Técnico em Desenvolvimento de Sistemas e estudante de Engenharia de Software no UniAteneu.'
    },
    {
      icon: '📚',
      title: 'Stack Moderna',
      description: 'Java, Spring Boot, React, TypeScript e Flutter para construir produtos robustos para web e mobile.'
    },
    {
      icon: '👥',
      title: 'Trabalho em Equipe',
      description: 'Experiência colaborando em equipes ágeis, com versionamento Git e comunicação clara em todo o ciclo de desenvolvimento.'
    }
  ];
}
