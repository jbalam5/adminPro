import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  
  forma: FormGroup;

  constructor( 
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    },{ validators: this.comparePass('password','password2') });

    this.forma.setValue({
      nombre: 'TEST',
      correo: 'test@test.com',
      password: '123',
      password2: '1234',
      condiciones: true
    });
  }

  comparePass(campo1: string, campo2: string){

    return (group: FormGroup ) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
    
      if(pass1 === pass2) {
        return null;
      }
      return { comparePass: true }
    };
  }

  register(){
    if( this.forma.invalid )
      return;
    
    if( !this.forma.value.condiciones ){
      swal("Importante", "Debe aceptar las condiciones", "warning");
      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.createUser( usuario ).subscribe( response => this.router.navigate(['/login']));
  }
}
