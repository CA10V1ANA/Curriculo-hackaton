import { Component } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

interface Skill {
  nome: string;
  porcentagem: number;
  categoria: string;
  iconClass?: string;
}

@Component({
  selector: 'app-skills',
  standalone: false,
  styleUrl: './skills.scss',
  templateUrl: './skills.html',
})
export class Skills {
  // 1. Nossa lista estática de habilidades
  todasHabilidades: Skill[] = [
    { nome: 'React', porcentagem: 90, categoria: 'Frontend', iconClass: 'devicon-react-original colored' },
    { nome: 'TypeScript', porcentagem: 88, categoria: 'Frontend', iconClass: 'devicon-typescript-plain colored' },
    { nome: 'HTML5', porcentagem: 95, categoria: 'Frontend', iconClass: 'devicon-html5-plain colored' },
    { nome: 'CSS3', porcentagem: 90, categoria: 'Frontend', iconClass: 'devicon-css3-plain colored' },
    { nome: 'Java', porcentagem: 85, categoria: 'Backend', iconClass: 'devicon-java-plain colored' },
    { nome: 'Spring', porcentagem: 80, categoria: 'Backend', iconClass: 'devicon-spring-original colored' },
    { nome: 'PostgreSQL', porcentagem: 75, categoria: 'Banco de Dados', iconClass: 'devicon-postgresql-plain colored' },
    { nome: 'Git / GitHub', porcentagem: 90, categoria: 'Ferramentas', iconClass: 'devicon-github-original colored' },
    { nome: 'Docker', porcentagem: 65, categoria: 'Cloud', iconClass: 'devicon-docker-plain colored' },
  ];

  // 2. Extraindo as categorias únicas dinamicamente
  categorias = ['Todos', ...new Set(this.todasHabilidades.map(s => s.categoria))];

  // 3. RxJS: BehaviorSubject guarda o estado da categoria atual
  categoriaAtiva$ = new BehaviorSubject<string>('Todos');

  // 4. RxJS: O fluxo de habilidades filtradas reage quando a categoria muda
  habilidadesFiltradas$ = this.categoriaAtiva$.pipe(
    map(categoria => {
      if (categoria === 'Todos') return this.todasHabilidades;
      return this.todasHabilidades.filter(s => s.categoria === categoria);
    })
  );

  // Função disparada no HTML ao clicar na aba
  selecionarCategoria(categoria: string) {
    this.categoriaAtiva$.next(categoria); // Atualiza o fluxo
  }
}
