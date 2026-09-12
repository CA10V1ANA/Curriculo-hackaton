import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: false,
  styleUrl: './hero.scss',
  templateUrl: './hero.html',
})
export class Hero {
  nome = 'Caio Viana';
  cargo = 'Tech Lead / Developer';
  frase = 'Transformo problemas reais em soluções digitais claras, funcionais e feitas para pessoas.';
}
