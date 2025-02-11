import {Component, inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Role } from '../models/role';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-user',
  imports: [CommonModule,RouterModule],
  template: `
     <section class="listing">
      
      <h2 class="listing-heading">User Name : {{ user.name }}</h2>
      <h3 class="listing-location">Adresse Mail : {{ user.mail }}</h3>
      <h3 class="listing-location">Role : {{ user.role }}</h3>
      
    
      <form >
       <a [routerLink]="['/users/details', user.id]">Learn More</a>
        <button *ngIf="loginService.getUserData().role===this.roleList.at(0)"
           type="button" class="primary" (click)="deleteUser(user) ">Supprimer</button>
      </form>
    </section>
    
   
  `,
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  
 @Input() user!: User;
 userService: UserService = inject(UserService);
 loginService: LoginService=inject(LoginService)
 roleList: Role[]=[Role.ADMIN, Role.CHEF, Role.USER, Role.NOTDEFINED];
 @Input() userList!: User[];

 deleteUser(user:  User){
     this.userService.deleteUser(user).subscribe(
       (data: User) => {
         
         this.userList=this.userList.filter(recette => recette!==data);
         console.log("data ", data, " UserList", this.userList);
         window.location.reload();
         
       }
     );
   }

}