import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario-models';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = 'https://identitytoolkit.googleapis.com/v1';

  apiKey:string = 'AIzaSyDTWJw_pUYVTpqdXgL6tAb-6eYZkMcVkHY';

  userToken:string;

  constructor(private http: HttpClient) { }

  register = (user:UsuarioModel) => {

    const dataAuth ={
      ...user,
      returnSecureToken: true
    };

   return this.http.post(

     `${this.url}/accounts:signUp?key=${this.apiKey}`, dataAuth
     
     ).pipe(
       map(resp => {

        this.saveToken(resp['idToken']);

        return resp;
       })
     )
  }

  login = (user:UsuarioModel) => {

    const authData = {
      ...user,
      returnSecureToken: true
    }

    return this.http.post(

      `${this.url}/accounts:signInWithPassword?key=${this.apiKey}`, authData
    ).pipe(
        map( resp => {

          console.log('entro en el map');
          
          this.saveToken(resp['idToken']);

          return resp;

        })
    )

  }

  logout = () => {

  }

  private saveToken = (idToken:string) => {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  getToken = () => {

    if(localStorage.getItem('token')){

      this.userToken = localStorage.getItem('token');

    }else{

      this.userToken = '';
    }
  }

  beAuth = ():boolean => {

    return this.userToken.length > 2;
  }

}
