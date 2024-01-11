import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-hero-page',
  templateUrl: './add-new-hero-page.component.html',
  styleUrls: ['./add-new-hero-page.component.scss']
})
export class AddNewHeroPageComponent implements OnInit{

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
  constructor( private heroService : HeroesService,
     private activatedRoute : ActivatedRoute,
     private router : Router,
    private snackbar: MatSnackBar,
    private dialog : MatDialog
     ){}
  get currentHero() : Hero{
    const hero = this.heroForm.value as Hero
    return hero
  }
  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return;
    this.activatedRoute.params
    .pipe(
      switchMap(({id})=> this.heroService.getHeroeById(id))
    ).subscribe(hero => {
      if(!hero) return this.router.navigateByUrl('/')
      this.heroForm.reset(hero)
      return
    })
  }

  public onSubmit():void{
    if(this.heroForm.invalid) return;
    if(this.currentHero.id){
      this.heroService.updateHero(this.currentHero)
      .subscribe(
        hero => {
          // TODO: Mostrar snackbar
          this.showSnackbar(`${hero.superhero} updated!`)
        }
      )
      return
    }
    // this.heroService.updateHero(this.heroForm.value)
    this.heroService.addHero(this.currentHero)
    .subscribe(
      hero=>{
        this.router.navigate(['/heroes/edit', hero.id])
        //TODO: mostrar snackbar y navegar a /heroes/edit/ hero.id
        this.showSnackbar(`${hero.superhero} created!!`)

      }
    )
  }
  onDeleteHero(){
    if(!this.currentHero.id) throw Error('Hero is required')
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });
    dialogRef.afterClosed()
    .pipe(
      filter((result: boolean) => result),
      switchMap(()=>this.heroService.deleteHeroById(this.currentHero.id)),
      tap((wasDeleted:boolean) => wasDeleted),
    )
    .subscribe(result => {
      this.router.navigate(['/heroes'])
    })
  }
  showSnackbar(message:string){
    this.snackbar.open(message, 'Cerrar', {
      duration:2500,
    })
  }
}
