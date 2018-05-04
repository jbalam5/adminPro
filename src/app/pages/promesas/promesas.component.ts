import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
  
    this.contarTres().then( 
      Mensaje => console.log('termino', Mensaje)
    )
    .catch( 
      Error => console.log('Error', Error)
    )
   }

  ngOnInit() {
  }

  contarTres(): Promise<boolean>{
    return new Promise( (resolve, reject) => {
      let contador = 0;
      
      let intervalo = setInterval( () => {
        contador +=1;
        console.log(contador);
        if (contador === 3){
          // reject('simplemente Error');
          resolve( true );
          clearInterval(intervalo);
        }
      }, 1000);
    });

  }    
}
