import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  
  // hidden: string = '';
  fileUpload:File;
  imgTemp: string;
  filePreview: string;

  constructor(public _uploadFileService: UploadFileService, public _modalUploadService: ModalUploadService) {
    console.log('modal listo');
  }

  ngOnInit() {
  }

  uploadImagen(){
    console.log('text');
    this._uploadFileService.uploadFile(this.fileUpload, this._modalUploadService.type, this._modalUploadService.id)
    .then( (response:any) => {
      this._modalUploadService.notificacion.emit( response.ok );
      this.closeModal();
    })
    .catch(err => {
      console.log(err);
    });
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

  closeModal(){
    this.fileUpload = null;
    this.imgTemp = null;
    this.filePreview = null;
    this._modalUploadService.hiddenModal();
  }

}
