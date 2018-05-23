import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styles: []
})
export class ProfilesComponent implements OnInit {

  usuario:Usuario;
  fileUpload:File;
  imgTemp: string;
  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  save(usuario: Usuario){
    this.usuario.nombre = usuario.nombre;
  
    if(!this.usuario.google )
      this.usuario.email = usuario.email;

    this._usuarioService.updateUser( this.usuario ).subscribe();
  }

  selectFile( archivo:File ){
    if( !archivo ){
      this.fileUpload = null;
      return;
    }

    if( archivo.type.indexOf('image') < 0 ){
      swal("Seleccione una imagen", "El archivo seleccionado no es una imagen", "error");
      this.fileUpload = null;
      return;
    }

    this.fileUpload = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imgTemp = reader.result;
    
  }

  changeImagen(){
    this._usuarioService.updateImagen( this.fileUpload, this.usuario._id );
  }
}
