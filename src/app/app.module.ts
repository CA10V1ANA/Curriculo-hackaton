import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { App } from './app';
import { Hero } from './components/hero/hero';
import { ThemeToggle } from './components/theme-toggle/theme-toggle';
import { Timeline } from './components/timeline/timeline';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { Footer } from './components/footer/footer';

@NgModule({
  declarations: [App, Hero, ThemeToggle, Timeline, About, Skills, Footer],
  imports: [BrowserModule, CommonModule],
  providers: [],
  bootstrap: [App],
})
export class AppModule {}
