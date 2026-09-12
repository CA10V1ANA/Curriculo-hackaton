# 💼 Currículo Viana - Tech Lead (Hackathon Proenergia)

Bem-vindo ao repositório do meu currículo digital! Este projeto foi construído como um treinamento prático e prova de conceito arquitetural para assumir o papel de **Tech Lead** na equipe do Hackathon Proenergia 2026.

🔗 **[Acesse o Currículo Online Aqui](https://CA10V1ANA.github.io/Curriculo-hackaton/)**

---

## 🏗️ Decisões de Arquitetura e Engenharia

Para este projeto, optei por fugir dos geradores padrão e construir uma aplicação robusta, aplicando conceitos avançados de engenharia de software e design de interfaces. Abaixo explico o **O Quê** e o **Porquê** de cada decisão.

### 1. Arquitetura Modular (NgModule)
Embora o Angular 17+ incentive os *Standalone Components*, optei deliberadamente por reestruturar este projeto para a arquitetura clássica baseada em `NgModule`.
- **Por quê?** Como Tech Lead em um Hackathon (onde frequentemente lidamos com legado corporativo ou integrações densas), dominar a Injeção de Dependência e a orquestração de módulos via `app.module.ts` garante um controle mais profundo do ciclo de vida da aplicação e facilita o onboarding de desenvolvedores que vêm de versões anteriores do Angular.

### 2. Estado Reativo com RxJS
Na seção de "Skills", implementei um sistema de filtros de linguagens e tecnologias sem o uso de condicionais pesadas (`if/else`).
- **Por quê?** Utilizei o padrão `BehaviorSubject` do RxJS acoplado ao `| async` pipe no HTML. Isso garante que a view reaja imediatamente às mudanças de estado da categoria selecionada, eliminando vazamentos de memória (Memory Leaks) nativamente, sem a necessidade de gerenciar inscrições manualmente.

### 3. Novo Controle de Fluxo (`@for`)
Nas seções de Linha do Tempo (Trajetória) e Habilidades (Skills), utilizei o novo bloco estrutural `@for`.
- **Por quê?** O novo motor de renderização do Angular é extremamente rápido. Usando `@for` acoplado ao `track`, o Angular sabe exatamente qual nó do DOM precisa ser atualizado, evitando a re-renderização total da lista, melhorando o consumo de bateria e processamento no cliente.

### 4. Design System Premium (Vanilla CSS e Glassmorphism)
Ao invés de depender de bibliotecas externas pesadas (como Bootstrap ou Material), criei um mini Design System próprio com SCSS puro.
- **Tokens (Variáveis):** Cores, espaçamentos e temas definidos no `:root`, permitindo uma transição orgânica entre Light e Dark Mode manipulando o `data-theme`.
- **Efeito Glassmorphism:** Uso de `backdrop-filter: blur(12px)` para criar profundidade e um visual moderno ("Vercel Style"), provando que é possível ter interfaces AAA+ sem sobrecarregar o bundle size.
- **Lógica CSS:** Layouts responsivos criados exclusivamente com `CSS Grid` (para os cards de Sobre Mim) e `Flexbox` com quebra de linha fluida (Skills).

---

## 🚀 Estrutura de Componentes

A interface (SPA - Single Page Application) foi pensada em blocos independentes e reutilizáveis:
- `<app-hero>`: Primeiro impacto visual com tipografia em gradiente.
- `<app-about>`: Cards explicativos focados em visão de produto.
- `<app-timeline>`: Linha do tempo construída com ilusão de ótica CSS (pseudo-elementos).
- `<app-skills>`: Mapa de habilidades interativo com Devicons via CDN (zero peso na build).
- `<app-footer>`: Links dinâmicos com chamadas diretas para APIs como `wa.me` e `mailto:`.

---

## 🛠️ Como rodar localmente

1. Clone o repositório:
   \`\`\`bash
   git clone https://github.com/CA10V1ANA/Curriculo-hackaton.git
   \`\`\`
2. Instale as dependências:
   \`\`\`bash
   npm install
   \`\`\`
3. Suba o servidor:
   \`\`\`bash
   npm run start
   \`\`\`

> *Feito com Angular, RxJS e muita Engenharia de Software.*
