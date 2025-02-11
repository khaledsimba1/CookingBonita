import { inject, Injectable } from '@angular/core';
import {Recette} from '../models/recette';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {

 private http = inject(HttpClient);
   utilisateurs : Recette[];
   recette!: Recette;
   constructor() {
     this.utilisateurs =[];
 
   }
 
   private baseUrl: string = environment.baseUrl;
   
   getAllRecettes(): Observable<Recette[]> {
     const url=this.baseUrl+'/recettes';
     return this.http.get<Recette[]>(`${url}`);
   }
 
   getRecetteById(id: number): Observable<Recette> {
     const url=`${this.baseUrl}/recette/${id}`;
     return this.http.get<Recette>(`${url}`);
   }
 
   updateRecette(recette: Recette): Observable<Recette> {
    console.log("Like this",JSON.stringify(recette));
     const url = `${this.baseUrl}/recette/${recette.id}`;

     console.log("URL",url);
     return this.http.put<Recette>(url, recette);  
   }

   addRecette(recette: Recette): Observable<Recette> {
     
    const url = `${this.baseUrl}/recette`;
    console.log(JSON.stringify(recette));
    return this.http.post<Recette>(url, recette, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })}); 
  }
 
   deleteRecette(recette: Recette): Observable<Recette> {
     
     const url = `${this.baseUrl}/recette/${recette.id}`;
     return this.http.delete<Recette>(url);  
   }
 
   filterResultsRecette(recetteList: Recette[],filteredRecetteList: Recette[],text: string) : Recette[] {
 
     if (!text) {
       filteredRecetteList = recetteList;
       return filteredRecetteList;
     }
     filteredRecetteList = recetteList.filter((recette) =>
       recette?.name.toLowerCase().includes(text.toLowerCase()),
     );
     return filteredRecetteList;
     
   }
 
  
   

   
}


