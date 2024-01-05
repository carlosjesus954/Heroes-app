import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {
  public searchInput = new FormControl('')
  public heroes : Hero[] =[]
  public selectedHeroe?: Hero
  constructor(private service : HeroesService){}
  searchHero(){
    const value : string =  this.searchInput.value || ''
    console.log(value)
    this.service.getSuggestions(value)
    .subscribe( heroes => this.heroes = heroes)
  }
  public onSelectedOption(event : MatAutocompleteSelectedEvent):void{
    if(!event.option.value){
      this.selectedHeroe = undefined
      return
    }
    const hero : Hero = event.option.value
    this.searchInput.setValue(hero.superhero)
    this.selectedHeroe = hero
  }
}
