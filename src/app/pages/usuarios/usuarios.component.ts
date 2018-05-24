import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadComponent } from '../../components/modal-upload/modal-upload.component';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  page: number = 0;
  total: number = 0;
  loader: boolean = true;
  
  constructor(
    public _usuariosService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.loadUsers();
    this._modalUploadService.notificacion.subscribe( response => this.loadUsers() );
  }
  
  loadUsers(){
    this.loader = true;
    this._usuariosService.loadUsers(this.page).subscribe((response:any) => {
      this.total = response.total;
      this.usuarios = response.Usuarios;
      this.loader = false;
    });
  }

  changePage( valor:number ){
    let page = this.page + valor;
    console.log(page);

    if(page >= this.total)
      return;
    
    if( page < 0 )
      return;

    this.page += valor;
    this.loadUsers();
  }

  searchUsers(termino:string){
    console.log(termino);
    if(termino.length <= 0 ){
      this.loadUsers();
      return;
    }

    this.loader = true;

    this._usuariosService.searchUsers( termino ).subscribe( (response:Usuario[]) => {
      this.usuarios = response;
      this.loader = false;
    });
  }
  
  deleteUser(usuario:Usuario){
    console.log(usuario);
    if(usuario._id === this._usuariosService.usuario._id){
      swal('No se puede eliminar el usuario', 'No se puede eliminar asi mismo', 'error');
      return false;
    }

    swal({
      title: "¿Desea continuar?",
      text: "El usuario "+ usuario.nombre +" será eliminado",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then( deleteUser => {
      if (deleteUser) {
        this._usuariosService.deleteUser( usuario._id ).subscribe((response:any) => {
          this.loadUsers();
        });
      }
    });
  }
  
  updateUser( usuario:Usuario ){
    this._usuariosService.updateUser( usuario ).subscribe();
    this.loadUsers();
  }

  showModal( id:string ){
    this._modalUploadService.showModal('usuarios', id);
  }
}
