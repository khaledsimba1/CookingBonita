import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { RecetteComponent } from '../recette/recette.component';
import { Recette } from '../models/recette';
import { Role } from '../models/role';


@Component({
  selector: 'app-details-users',
  imports: [CommonModule, ReactiveFormsModule,RecetteComponent],
  template: `
  <article>
    <section class="listing-apply">
      <h1 class="section-heading">Informations de l'utilisateur</h1>
      <div class="info-container">

        <div class="info-column">
          <h3 class="listing-user">User Name: {{user?.name}}</h3>
          <h3 class="listing-user">Adresse Mail: {{user?.mail}}</h3>
          <h3 class="listing-user">Role: {{user?.role}}</h3>
        </div>

        <div class="column-separator"></div>
        
        <div class="info-column" >
          <h1 class="section-heading">Modifier l'utilisateur</h1>
          <form [formGroup]="applyForm" (submit)="submitApplication()">
            <label for="name">Name</label>
            <input id="name" type="text" formControlName="name" />

            <label for="email">Email</label>
            <input id="email" type="email" [(ngModel)]="user.mail" formControlName="email" />

            <div class="form-row">
              <label for="role">Rôle</label>
              <select id="role" formControlName="role" [(ngModel)]="user.role">
                <option *ngFor="let role of roleList" [value]="role"> {{ role }}</option>
              </select>
            </div>
            
            <div class="form-row">
              <label for="password">Password</label>
              <input id="password" type="password" formControlName="password" />
            </div>

            <button type="submit" class="primary">Modifier</button>
          </form>
        </div>
      </div>

      <div class="recettes-container">
        <div class="recette-row" *ngFor="let row of getRecettesRows(userRecetteList)">
          <div class="recette-column" *ngFor="let recette of row">
            <app-recette [recette]="recette"></app-recette>
          </div>
        </div>
      </div>
    </section>
  </article>
  `,
  styleUrls: ['./details-users.component.css'],
})

export class DetailsUsersComponent {
  
  route: ActivatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);
  
  user: User ;
  updatedUser: User ;

  userRecetteList: Recette[]=[];
  roleList: Role[]=[];
  
  applyForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    password: new FormControl('')

  });

  constructor() {

    this.roleList= [Role.ADMIN, Role.CHEF, Role.USER, Role.NOTDEFINED]
    this.user={
    
      id:  -1, name: '',mail: '',password:'',role: ''
    };
    this.updatedUser=this.user;
  
   const id = parseInt(this.route.snapshot.params['id'], 10);
    this.userService.getUserById(id).subscribe(
      (data: User) => {
        if (data){
          this.user = data; 
          
        }
           
        
      }
    );
  }
  
  submitApplication() {

    const name= this.applyForm.value.name?.trim() 
    const mail= this.applyForm.value.email?.trim()
    const password = this.applyForm.value.password?.trim()
    const role = this.applyForm.value.role?.trim()
    
    //Au moin un champs rempli
    if ((name && name!=='') || (mail && mail!=='') || (password && password!=='') || (role && role!=='')) {
      
      console.log("Le formulaire a été modifié.", this.applyForm);
      
      this.updatedUser= {
    
        id:  this.user.id,
        name: name ??  this.user.name,
        mail: mail ?? this.user.mail,
        password: password ?? this.user.password,
        role: role ?? this.user.role

      };

      this.userService.submitUpdateApplication(this.updatedUser).subscribe(
        (data) => {
          if ( data)
          this.user =data;
        }
      );
    } 
    else
      console.log("Le formulaire n'a pas été modifié."); 
  }

  getRecettesRows(recettes: any[]): any[] {
    const rows = [];
    for (let i = 0; i < recettes.length; i += 3) {
      rows.push(recettes.slice(i, i + 3));
    }
    return rows;
  }
  
}