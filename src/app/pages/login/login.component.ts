import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario-models';
import { AuthService } from '../../services/auth.service';


import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:UsuarioModel;

  remember:boolean = false;

  constructor(private auth:AuthService, private router: Router) { }

  ngOnInit() {
    this.user = new UsuarioModel();

    if(localStorage.getItem('email')){

      this.user.email = localStorage.getItem('email');
      this.remember = true;
    }
  }

  login = (form:NgForm) => {

    if(form.invalid){return;}

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere Por favor....'
    })
    Swal.showLoading();
    
    this.auth.login(this.user).subscribe(resp => {

      if(this.remember){
       
        localStorage.setItem('email', this.user.email);
        
      }
      
      console.log(resp);

      Swal.close();

      this.router.navigateByUrl('/home')

    }, (err) => {
      Swal.fire({
        icon:'error',
        text: err.error.error.message
      })
    });
  
  }
}
