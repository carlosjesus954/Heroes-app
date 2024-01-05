import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.scss']
})
export class HeroPageComponent implements OnInit{
  public hero?:Hero
  constructor(private heroService : HeroesService,private activateRoute : ActivatedRoute, private router : Router){}
  ngOnInit(): void {
    this.activateRoute.params
    .pipe(
      delay(2000),
      switchMap( ({id}) => this.heroService.getHeroeById(id) ),
    ).subscribe(heroe=>{
      if (!heroe) return this.router.navigate(['/heroes/list'])
      this.hero = heroe
    console.log(this.hero)
    return;
    })
   
  }
  public goBack():void{
    this.router.navigateByUrl('heroes/list')
  }
}
