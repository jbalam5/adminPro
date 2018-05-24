import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  public type:string;
  public id:string;
  public hidden: string = 'd-hidden';

  public notificacion = new EventEmitter<boolean>();

  constructor() { }

  hiddenModal(){
    this.hidden = 'd-hidden';
    this.type = null;
    this.id = null;
  }

  showModal(type: string, id: string){
    this.hidden = '';
    this.id = id;
    this.type = type;
  }
}
