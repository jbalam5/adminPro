import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { UploadFileService } from "../upload-file/upload-file.service";

@Injectable()
export class UsuarioService {
  usuario:Usuario;
  token: string;
  
  constructor( 
    public http: HttpClient, 
    public router:Router, 
    public _uploadFileService:UploadFileService ) {
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

  updateUser( usuario: Usuario){
    let url = URL_SERVICE + '/usuario/'+ usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario)
      .map( (response:any) => {
        
        if(usuario._id === this.usuario._id){
          let usuarioRes: Usuario = response.usuario;
          this.saveStorage(usuarioRes._id, this.token, usuarioRes);
        }
        
        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      });
  }

  updateImagen(archivo: File, id:string){
    this._uploadFileService.uploadFile( archivo, 'usuarios', id )
      .then( (response:any) => {

        this.usuario.img = response.usuario.img;
        swal('Foto de perfil actualizado', this.usuario.nombre, 'success');

        this.saveStorage(id, this.token, this.usuario);

      }).catch( response => {
        console.log(response);  
      });
  }

  loadUsers(page:number = 0){
    let url = URL_SERVICE + '/usuario?page=' + page;
    return this.http.get(url);
  }

  searchUsers( search: string){
    let url = URL_SERVICE + '/busqueda/coleccion/usuarios/' + search;
    return this.http.get( url )
      .map( (response:any) => response.usuarios);
  }
  
  deleteUser( id:string ){
    let  url = URL_SERVICE + '/usuario/'+id;
    url += "?token=" + this.token;

    return this.http.delete(url).map((response:any) => {
      swal('Usuario eliminado', "El usuario ha sido eliminado correctamente", 'success');
      return true;
    });
  }
}