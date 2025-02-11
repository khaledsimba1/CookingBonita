import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RecetteService } from '../services/recette.service';
import { Recette } from '../models/recette';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Ingredient } from '../models/ingredient';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login.service';
import { Role } from '../models/role';

@Component({
  selector: 'app-details-recette',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <article>
    <section class="listing-apply">
      <h3>Informations de la Recette</h3>
      <div class="info-container">
        <div class="info-column">
          <h3 >Nom de la recette: {{recette?.name}}</h3>
          <h3 >CHEF : {{recette?.auteur?.name}}</h3>
          <h3 >Ingrédients:
            <ul >
              <li class="listing-recette" *ngFor="let ingredient of recette?.ingredients">
                {{ ingredient.value }}
              </li>
            </ul>
          </h3>
        </div>

        <!-- Ligne de séparation -->
        <div class="column-separator"></div>

        <!-- Formulaire de modification de la recette -->
        <div class="info-column" *ngIf="loginService.getUserData().role === this.roleList.at(0) || (loginService.getUserData().role === this.roleList.at(1) && loginService.getUserData().id === recette.auteur.id)">
          <h1 class="section-heading">Modifier la Recette</h1>
          <form [formGroup]="applyForm" (submit)="submitApplication()">

            <div class="form-row">
              <label for="ingredients">Ingrédients separés d'une virgule </label>
              <input id="ingredients" type="text" formControlName="ingredients" />
            </div>

            <button type="submit" class="primary">Modifier</button>
          </form>
        </div>
      </div>
    </section>
  </article>

  `,
  styleUrls: ['./details-recettes.component.css'],
})

export class DetailsRecettesComponent {
  
  route: ActivatedRoute = inject(ActivatedRoute);
  recetteService = inject(RecetteService);
  userService = inject(UserService);
  loginService: LoginService=inject(LoginService)
  roleList: Role[]=[Role.ADMIN, Role.CHEF, Role.USER, Role.NOTDEFINED];
  
  recette!: Recette;
  updatedRecette!: Recette;

  userRecetteList: Recette[] = [];
  
  applyForm = new FormGroup({
    ingredients: new FormControl('')
  });

  constructor() {

    const id = parseInt(this.route.snapshot.params['id'], 10);

    this.recetteService.getRecetteById(id).subscribe(
      (data: Recette) => {
        if (data) {
          this.recette = data;
          this.updatedRecette = this.recette;

        }
      }
    );
  }
  
  submitApplication() {

    console.log('Recette à mettre à jour')
    const ingredientsString = this.applyForm.value.ingredients?.trim();

    const ingredients: Ingredient[] = ingredientsString?.split(',').map(value => ({ value: value.trim() })) ?? [];

    console.log('Ingredient: ', ingredients)

    if (ingredientsString ) {
      console.log('C est parti: ')
      this.updatedRecette = {
        id: this.recette.id,
        name: this.recette.name,
        ingredients: ingredients ,
        auteur: this.recette.auteur,
      };
      console.log('UpdatedRecette: ', this.updatedRecette)

      this.recetteService.updateRecette(this.updatedRecette).subscribe(
        (data: Recette) => {
          if (data) {
            this.recette = data;
            console.log('Recette mise à jour', data);
          }
        }
      );

      console.log('Fin Bizarre ')
    } else {
      console.log("Le formulaire n'a pas été modifié.");
    }
  }

  getRecettesRows(recettes: any[]): any[] {
    const rows = [];
    for (let i = 0; i < recettes.length; i += 3) {
      rows.push(recettes.slice(i, i + 3));
    }
    return rows;
  }
}
