import { Component } from '@angular/core';

interface TimelineItem {
  id: number;
  ano: string;
  cargo: string;
  descricao: string;
}

@Component({
  selector: 'app-timeline',
  standalone: false,
  styleUrl: './timeline.scss',
  templateUrl: './timeline.html',
})
export class Timeline {
  // Lista de itens que o HTML vai percorrer e desenhar
  historico: TimelineItem[] = [
    {
      id: 1,
      ano: '2023 - 2025',
      cargo: 'Ensino Médio Profissionalizante',
      descricao: 'Conclusão do Ensino Médio Eeep Marwin.'
    },
    {
      id: 2,
      ano: '2025 - Atual',
      cargo: 'Desenvolvedor Full Stack Estagiário',
      descricao: 'Atuação em projetos corporativos, entregando valor real para usuários.'
    },
    {
      id: 3,
      ano: '2026',
      cargo: 'Tech Lead',
      descricao: 'Liderando a equipe no Hackathon Proenergia, arquitetando soluções em Angular.'
    },
    {
      id: 4,
      ano: '2026 - Atual',
      cargo: 'Engenharia de Software - UniAteneu',
      descricao: 'Aprendizado Sem Limites e desenvolvimento de soluções inovadoras.'
    }
  ];
}
