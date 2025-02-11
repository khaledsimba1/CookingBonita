import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecetteComponent} from '../recette/recette.component';
import { UserComponent } from '../user/user.component';
import {Recette} from '../models/recette';
import { User } from '../models/user';
import {RecetteService} from '../services/recette.service';
import { UserService } from '../services/user.service';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Ingredient } from '../models/ingredient';
import { Role } from '../models/role';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-home',
  imports: [CommonModule, RecetteComponent, UserComponent,ReactiveFormsModule, LoginComponent],
  template: `
    <section *ngIf="loginService.isLoggedIn()" class="main-container">
     
      <!-- Liste des Recettes -->
      <section *ngIf="loginService.getUserData().role===this.roleList.at(0) || loginService.getUserData().role===this.roleList.at(2) || loginService.getUserData().role===this.roleList.at(1) " >
        <header>
          <h1 class="title">Liste des Recettes</h1>
        </header>

        <section class="search-bar">
          <form (keydown)="filterResultsRecette(filter.value)">
            <input type="text" placeholder="Filter by name" #filter>
            <button type="button" class="primary" (click)="filterResultsRecette(filter.value)">Search</button>
            
            <button *ngIf="!isFormRecetteVisible && (loginService.getUserData().role===this.roleList.at(0)|| loginService.getUserData().role===this.roleList.at(1))" type="button" class="primary" (click)="activeFormulaire('recette')">Ajouter recette ?</button>
            <button *ngIf="isFormRecetteVisible" type="button" class="primary" (click)="activeFormulaire('recette')">Cacher le formulaire</button>
          </form>
        </section>

        <!-- Formulaire d'ajout de recette -->
        <section *ngIf="isFormRecetteVisible" class="form-section">
          <div class="form-wrapper">
            <form [formGroup]="applyFormRecette" (submit)="submitForm('recette')">
              <div class="form-row">
                <label for="name">Name</label>
                <input id="name" type="text" formControlName="name" />
              </div>

              <div class="form-row">
                <label *ngIf="loginService.getUserData().role===this.roleList.at(0)" for="auteur">Auteur</label>
                <select *ngIf="loginService.getUserData().role===this.roleList.at(0)" id="auteur" formControlName="auteur">
                  <option *ngFor="let user of chefs" [value]="user.id">{{ user.name }}</option>
                </select>
                <input *ngIf="loginService.getUserData().role===this.roleList.at(1)" id="auteur" type="hidden" formControlName="auteur" value=loginService.getUserData().id/>
              </div>

              <div class="form-row">
                <label for="ingredients">Ingredients</label>
                <input id="ingredients" type="text" formControlName="ingredients" />
              </div>

              <div class="form-row submit-row">
                <button type="submit" class="primary">Ajouter</button>
              </div>
            </form>
          </div>
        </section>

        <!-- Affichage des recettes -->
        <section class="recettes-list">
          <div class="result-container">
            <div  *ngFor="let row of getRows(filteredRecetteList)">
              <div class="result-column" *ngFor="let recette of row">
                <app-recette [recette]="recette" [recetteList]="recetteList"></app-recette>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section *ngIf="loginService.getUserData().role===this.roleList.at(0)" >
        <header>
         <br> <h1 class="title">Liste des Utilisateurs</h1>
        </header>
        <section class="primary" class="search-bar">
          <form (keydown)="filterResultsUser(filterUser.value)">
            <input type="text" placeholder="Filter by name" #filterUser>
            <button type="button" class="primary" (click)="filterResultsUser(filterUser.value)">Search</button>

            <button *ngIf="!isFormUserVisible" type="button" class="primary" (click)="activeFormulaire('user')">Ajouter un utilisateur ?</button>
            <button *ngIf="isFormUserVisible" type="button" class="primary" (click)="activeFormulaire('user')">Cacher le formulaire</button>
          </form>
        </section>

        <!-- Formulaire d'ajout d'utilisateur -->
        <section *ngIf="isFormUserVisible" class="form-section">
          <div class="form-wrapper">
            <form [formGroup]="applyFormUser" (submit)="submitForm('user')">
              <div class="form-row">
                <label for="name">Nom d'utilisateur</label>
                <input id="name" type="text" formControlName="name" />
              </div>

              <div class="form-row">
                <label for="mail">Email</label>
                <input id="mail" type="text" formControlName="mail" />
              </div>

              <div class="form-row">
                <label for="role">Rôle</label>
                <select id="role" formControlName="role">
                  <option *ngFor="let role of roleList" [value]="role">{{ role }}</option>
                </select>
              </div>
              
              <div class="form-row">
                <label for="password">Password</label>
                <input id="password" type="password" formControlName="password" />
              </div>

              <div class="form-row submit-row">
                <button type="submit" class="primary">Ajouter</button>
              </div>
            </form>
          </div>
        </section>
        <!-- Affichage des utilisateurs -->
        <section class="users-list">
          <div class="result-container">
            <div *ngFor="let row of getRows(filteredUserList)">
              <div class="result-column" *ngFor="let user of row">
                <app-user [user]="user" [userList]="userList">></app-user>
              </div>
            </div>
          </div>
        </section>
      </section>
  
    </section>

  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  
  recetteList: Recette[] = []; 
  userList: User[]=[];
  chefs: User[]=[];
  roleList: Role[]=[];
  filteredRecetteList: Recette[] = [];
  filteredUserList: User[]=[];

  isFormRecetteVisible: boolean=false;
  isFormUserVisible: boolean=false;

  recetteService: RecetteService = inject(RecetteService);
  userService: UserService= inject (UserService);
  loginService: LoginService=inject(LoginService)
  
  
  applyFormRecette = new FormGroup({
      name: new FormControl(''),
      auteur: new FormControl(''),
      ingredients: new FormControl(''),
  
    });

    applyFormUser= new FormGroup({
      name: new FormControl(''),
      mail: new FormControl(''),
      role: new FormControl(''),
      password: new FormControl(''),
  
    });

  constructor() {

    this.roleList= [Role.ADMIN, Role.CHEF, Role.USER, Role.NOTDEFINED]
    
    this.recetteService.getAllRecettes().subscribe(
      (data: Recette[]) => {
        console.log("data ", data);
        this.recetteList = JSON.parse(JSON.stringify(data));
        this.filteredRecetteList = this.recetteList;
      }
    );
  
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        console.log("data ", data);
        this.userList = JSON.parse(JSON.stringify(data));;
        this.filteredUserList = this.userList;

        this.chefs=this.userList.filter(user => user.role==Role.CHEF)

        console.log ("Chef oui chef ", JSON.stringify(this.chefs))
      }
    );

    
  }
    
  filterResults(list: any[], text: string, key: string): any[] {
    if (!text) {
      return list;
    }
    return list.filter((item) =>
      item[key]?.toLowerCase().includes(text.toLowerCase())
    );
  }
  
  filterResultsRecette(text: string) {
    this.filteredRecetteList = this.filterResults(this.recetteList, text, 'name');
  }
  
  filterResultsUser(text: string) {
    this.filteredUserList = this.filterResults(this.userList, text, 'name');
  }
    
  getRows(any: any[]): any[] {
    const rows = [];
    for (let i = 0; i < any.length; i += 1) {
      rows.push(any.slice(i, i + 1));
    }
    return rows;
  }

  activeFormulaire(form:string){ 
    if(form==="user")
    {
      if(this.isFormUserVisible===false){
        this.isFormUserVisible=true;
        this.isFormRecetteVisible=false;
      }
          
      else this.isFormUserVisible=false;
    }
    else
    {
      if(this.isFormRecetteVisible===false){
        this.isFormRecetteVisible=true;
        this.isFormUserVisible=false;
      }
        
      else this.isFormRecetteVisible=false
    }
      
  }
  
  submitForm(type: 'recette' | 'user') {
    let requestData: any;
  
    if (type === 'recette') {
      const idAuteur: number = parseInt(this.applyFormRecette.value.auteur ?? '');
      const ingredientsArray: string[] = this.applyFormRecette.value.ingredients?.split(',') ?? [];
  
      this.userService.getUserById(idAuteur).subscribe(
        (data: User) => {
          const auteur: User = data;
          const ingredients: Ingredient[] = ingredientsArray.map((ingredientValue) => {
            return { value: ingredientValue.trim() };
          });
  
          requestData = {
            name: this.applyFormRecette.value.name ?? '',
            auteur: auteur,
            ingredients: ingredients,
          };
  
          // Appel à la méthode addRecette du service Recette
          this.recetteService.addRecette(requestData).subscribe(
            (data) => {
              if (data) {
                this.recetteList.push(data);
                this.isFormRecetteVisible = false;
              }
            }
          );
        }
      );
    } else if (type === 'user') {
      const name = this.applyFormUser.value.name ?? '';
      const mail = this.applyFormUser.value.mail ?? '';
      const role = this.applyFormUser.value.role ?? '';
      const password = this.applyFormUser.value.password ?? '';
  
      requestData = {
        name: name,
        mail: mail,
        role: role,
        password: password,
      };
  
      // Appel à la méthode addUser du service User
      this.userService.addUser(requestData).subscribe(
        (data: User) => {
          if (data) {
            this.userList.push(data);
            this.chefs=this.userList.filter(user => user.role==Role.CHEF);
            this.isFormUserVisible = false;
          }
        }
      );
    }
  }

}