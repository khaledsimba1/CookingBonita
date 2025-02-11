// login.component.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  template: `
  
  <div class="login-container">
    <form *ngIf="!loginService.isLoggedIn()" (ngSubmit)="onLogin()" class="login-form">
      <div>
        <label for="mail">Adresse mail</label>
        <input type="text" id="mail" [(ngModel)]="mail" name="mail" required />
      </div>
      <div>
        <label for="password">Mot de passe</label>
        <input type="password" id="password" [(ngModel)]="password" name="password" required />
      </div>
      <button type="submit">Se connecter</button>
      <div *ngIf="error" class="error">{{ errorMessage }}</div>
    </form>

    <form *ngIf="loginService.isLoggedIn()" (ngSubmit)="logOut()" class="logout-form">
      <button type="submit">Se Deconnecter</button>
    </form>
  </div>

 

`,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mail: string = '';
  password: string = '';
  errorMessage: string = '';
  error:boolean=false;


  loginService =inject(LoginService);
  router = inject(Router)
 
  constructor() {}

  onLogin(): void {
    this.loginService.login(this.mail, this.password).subscribe(
      (user) => {
        console.log("User auth : ",user);
        if(user){
          this.loginService.saveUserData(user);
          this.router.navigate(['/home']);
        }
        else{
          this.error=true;
          this.errorMessage='Connection echouée'

        }
          
      }
    );
  }

  logOut(): void{
    this.loginService.logout()
    //this.router.navigate(['/login']);
    window.location.reload();
    console.log("Routing home fait ");
  }
}
