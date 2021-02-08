import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/Constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  findAllUsers(): Observable<any> {
    return this.http.get(Constants.FIND_ALL_USERS);
  }

  addNewUser(user: any): Observable<any> {
    return this.http.post(Constants.ADD_NEW_USER, user);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(Constants.UPDATE_USER, user);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(Constants.DELETE_USER + id);
  }

  findUserById(id: any): Observable<any> {
    return this.http.get(Constants.FIND_BY_ID + id);
  }

  findByCriteria(criteria: any, searchItem: any): Observable<any> {
    return this.http.get(Constants.FIND_BY_CRITERIA + criteria + "&searchItem=" + searchItem);
  }
}
