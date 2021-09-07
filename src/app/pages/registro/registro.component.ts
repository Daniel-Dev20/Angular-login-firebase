import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario-models';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  usuario:UsuarioModel;

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {
    
    this.usuario = new UsuarioModel();

   }

   onSubmit = (form:NgForm) => {
     if(form.invalid){ return;}
     Swal.fire({
       allowOutsideClick:false,
      icon: 'info',
      text: 'Espere Por favor...'
     });

     Swal.showLoading();
     
     this.auth.register(this.usuario).subscribe(resp => {
      
        console.log(resp);

        Swal.close();

        this.router.navigateByUrl('/home');

     }, (err) => {
       Swal.fire({

         icon:'error',
         text: err.error.error.message
       })
     })
   }

}
