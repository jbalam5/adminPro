import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
 @Input('nombre') leyenda:  string = 'Leyenda';
 @Input() porcentaje: number= 50;

 @Output('update') cambioProgres: EventEmitter<number> = new EventEmitter();
 @ViewChild('txtProgress') txtProgress: ElementRef;

  constructor() {
    console.log(this.leyenda, this.porcentaje);
   }

  ngOnInit() {
    console.log(this.leyenda, this.porcentaje, 'on init');
  }
  onChanges( newValue: number){

    console.log(newValue);
    if(newValue >= 100){
      this.porcentaje = 100;
    }else if(newValue <=0){
      this.porcentaje = 0;
    }else{
      this.porcentaje = newValue
    } 

    this.txtProgress.nativeElement.valor = this.porcentaje;
    this.cambioProgres.emit(this.porcentaje);
  }
  cambiarValor(valor:number){
    if(this.porcentaje >=100 && valor > 0){
      this.porcentaje = 100;
      return;
    }
    if(this.porcentaje <=0 && valor < 0){
      this.porcentaje = 0;
      return;
    }
    this.porcentaje = this.porcentaje + valor;
    this.cambioProgres.emit(this.porcentaje);
    this.txtProgress.nativeElement.focus();
  }
}
