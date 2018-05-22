import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {
  usuario:Usuario;
  token: string;
  
  constructor( public http: HttpClient, public router:Router) {
    this.loadStorage();
  }

  isLogin() {
    return ( this.token.length > 5) ? true : false;
  }

  loadStorage() {
    if( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }
  createUser( usuario:Usuario ) {
    let url = URL_SERVICE + '/usuario';
    return this.http.post( url , usuario)
      .map( (response:any) => {
        swal('Usuario creado', usuario.email, 'success');
        return response.usuario;
      });
  }
  loginGoogle( token: string){
    let url = URL_SERVICE + '/login/google';

    return this.http.post( url, { token })
      .map( (response:any) => {
        this.saveStorage(response.id, response.token, response.usuario);
        return true;
      });
  }

  login( usuario: Usuario, recordar: boolean = false ){

    if( recordar )
      localStorage.setItem('email', usuario.email);
    else
      localStorage.removeItem('email');

    let url = URL_SERVICE + '/login';
    return this.http.post( url, usuario)
      .map((response:any) => {
        this.saveStorage(response.id, response.token, response.usuario);
        return true;
      });
  }

  logout(){
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    
    this.router.navigate(['/login']);
  }
  saveStorage(id:string, token:string, usuario:Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario) );
    
    this.usuario = usuario;
    this.token = token; 
  }
}