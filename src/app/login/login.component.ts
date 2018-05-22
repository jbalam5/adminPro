import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { stringify } from 'querystring';

declare function init_plugins();
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  recuerdame:boolean = false;
  email:string;
  auth2:any;

  constructor(public _router: Router, public _usuarioService: UsuarioService) { }
  
  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    this.googleInit();

    if(this.email.length > 1 ){
      this.recuerdame = true;
    }
  }

  googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({ 
        client_id: '820832394719-o8ksgoj4d831okf21qmddg5hcjdp0tbf.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSigin( document.getElementById('btnGoogle'));
    });
  }

  attachSigin( element ){
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      
      this._usuarioService.loginGoogle( token ).subscribe( () => 
      window.location.href="#/dashboard"
        // this._router.navigate(['/dashboard'])
      );
    });
  }
  
  ingresar( form: NgForm){
    if(form.invalid)
      return;
    
    let usuario = new Usuario( null, form.value.email, form.value.password );

    this._usuarioService.login( usuario, form.value.recuerdame ).subscribe(response => this._router.navigate(['/dashboard']) );
  }
}
