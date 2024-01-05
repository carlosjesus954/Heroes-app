import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'hero-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  ngOnInit(): void {
    if(!this.heroe) throw Error('Hero property is required')
  }
  @Input()
  public heroe!:Hero
}
