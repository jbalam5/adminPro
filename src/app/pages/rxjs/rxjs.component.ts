import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import { Observable, Subscription } from 'rxjs/Rx';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy{
  suscription: Subscription;
  constructor() {
    this.suscription = this._getObservable()
      .subscribe( 
        numero => console.log('suscribe', numero),
        error => console.error('Error en el obs', error),
        () => console.log('El observador termino!')
    );
   }

  ngOnInit() {
  }
  ngOnDestroy(){
    console.log('la pagina se va ha cerrar');
    this.suscription.unsubscribe();
  }
  _getObservable(): Observable<any>{
    return new Observable( observer => {
      let contador = 0;

      let intervalo = setInterval( () => {
        contador += 1;

        let salida = {
          valor: contador
        }

        observer.next( salida );
        // if(contador === 3){
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if( contador === 2 ){
        //   // clearInterval(intervalo);
        //   observer.error('Error valor no permitido');
        // }
      }, 500);
    })
    .retry(2)
    .map((response: any) => {
      return response.valor;
    })
    .filter((valor, index) => {
      // console.log('Filter', valor, index);
      if((valor % 2) === 1){ //impar
        return true;
      }else{
        return false;
      }
    });
    // return obs;
  }
}
