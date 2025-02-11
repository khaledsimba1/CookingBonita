import {Component, inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {Recette } from '../models/recette';
import { RecetteService } from '../services/recette.service';
import { Role } from '../models/role';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-recette',
  imports: [CommonModule,RouterModule],
  template: `
  <section class="listing">
    
    <div >   
      <h2 class="listing-heading">Recette : {{ recette.name }}</h2>
      <h3 class="listing-recette">Nom du Chef : {{ recette.auteur.name }}</h3>
      <h3 class="listing-heading">Liste des ingredients : </h3>
    </div>
    <div >
      <b class="listing-ingredient" *ngFor="let ingredient of recette.ingredients" >{{ ingredient.value }}<br></b>
      <form >
        <a [routerLink]="['/recettes/details', recette.id]">Learn More</a>
        <button *ngIf="loginService.getUserData().role===this.roleList.at(0) || (loginService.getUserData().role===this.roleList.at(1) && recette.auteur.id===loginService.getUserData().id)" 
          type="button" class="primary" (click)="deleteRecette(recette) ">Supprimer</button>
      </form>
    </div> 
  </section>
  `,
  styleUrls: ['./recette.component.css'],
})
export class RecetteComponent {
  
  @Input() recette!: Recette;
  @Input() recetteList!: Recette[];
  recetteService: RecetteService = inject(RecetteService);
  loginService: LoginService=inject(LoginService)
  roleList: Role[]=[Role.ADMIN, Role.CHEF, Role.USER, Role.NOTDEFINED];

  deleteRecette(recette:  Recette){
    this.recetteService.deleteRecette(recette).subscribe(
      (data: Recette) => {
        console.log("data ", data, "recetteList: ", this.recetteList, "list ", this.recetteList);
        this.recetteList=this.recetteList.filter(recette => recette.auteur.id!==data.auteur.id);
        
        window.location.reload();
      }
    );
  }

}
