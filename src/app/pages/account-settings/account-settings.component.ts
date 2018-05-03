import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public _settings: SettingsService) { }

  ngOnInit() { 
      this.marckTheme();   
  }

  changeColor( color:string, link: any ){
    this.selectTheme(link);    
    this._settings.applyTheme(color);
  }
  selectTheme(link:any){
    let itemTheme:any = document.getElementsByClassName('selector');
    
    for( let ref of itemTheme ){
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }
  marckTheme() {
    let itemTheme:any = document.getElementsByClassName('selector');
    let tema = this._settings.ajustes.tema;
    for( let ref of itemTheme ){
      if(ref.getAttribute('data-theme') === tema){
        ref.classList.add('working');
        break;
      }
    }
  }
}
