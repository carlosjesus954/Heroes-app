import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-add-new-hero-page',
  templateUrl: './add-new-hero-page.component.html',
  styleUrls: ['./add-new-hero-page.component.scss']
})
export class AddNewHeroPageComponent {

  public heroForm =   new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('',{nonNullable:true}),
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_img:          new FormControl(''),
  })
  public publishers = [
    {
      id: 'DC Comics', desc:'Dc - Comics'
    },
    {
      id: 'Marvel Comics', desc:'Marvel - Comics'
    }
  ]
  constructor( private heroService : HeroesService){}
  get currentHero() : Hero{
    const hero = this.heroForm.value as Hero
    return hero
  }
  public onSubmit():void{
    if(this.heroForm.invalid) return;

    // this.heroService.updateHero(this.heroForm.value)

  }
}
