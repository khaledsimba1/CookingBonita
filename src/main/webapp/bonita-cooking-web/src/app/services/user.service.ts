import { Injectable, inject } from '@angular/core';
import {User} from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  utilisateurs : User[];
  user!: User;
  constructor() {
    this.utilisateurs =[];

  }

  private baseUrl: string = environment.baseUrl;
  
  getAllUsers(): Observable<User[]> {
    const url=this.baseUrl+'/users';
    return this.http.get<User[]>(`${url}`);
  }

  getUserById(id: number): Observable<User> {
    const url=`${this.baseUrl}/user/${id}`;
    return this.http.get<User>(`${url}`);
  }
  addUser(user: User): Observable<User> {
       
      const url = `${this.baseUrl}/user`;
      console.log(JSON.stringify(user));
      return this.http.post<User>(url, user, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })}); 
  }

  updateUser(user: User): Observable<User> {
    
    const url = `${this.baseUrl}/user/${user.id}`;
    return this.http.put<User>(url, user);  
  }

  deleteUser(user: User): Observable<User> {
    const url = `${this.baseUrl}/user/${user.id}`;
    return this.http.delete<User>(url);  
  }

  filterResultsUser(userList: User[],filteredUserList: User[],text: string) : User[] {

    if (!text) {
      filteredUserList = userList;
      return filteredUserList;
    }
    filteredUserList = userList.filter((user) =>
      user?.name.toLowerCase().includes(text.toLowerCase()),
    );
    return filteredUserList;
    
  }

  submitUpdateApplication(user: User) : Observable<User> {
   
    return this.updateUser(user);
   
  }
}


