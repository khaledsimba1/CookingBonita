import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  imports: [ RouterModule,LoginComponent],
  template: `
    <main>
     
     <div class="blue-banner-top"></div> <!-- Bande bleue en haut -->

      <div class="container">
        <ul class="nav nav-pills">
          <li class="login-item">
            <app-login></app-login>
          </li>
        </ul>
      </div>
      
      <section class="content">
        <router-outlet></router-outlet>
      </section>

       <div class="blue-banner-bottom"></div> <!-- Bande bleue en bas -->
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'default';
  
}

