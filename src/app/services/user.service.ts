import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.get(`${ this.url }?username=${ user.username }`)
  }
}
