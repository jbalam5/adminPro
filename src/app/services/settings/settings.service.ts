import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {
  ajustes: Ajustes = {
    temaUrl: "assets/css/colors/default.css",
    tema: "default"
  };
  constructor(@Inject(DOCUMENT) private _document) {
    this.loadSettings();
  }

  saveSettings() {
    localStorage.setItem("settings", JSON.stringify(this.ajustes));
  }

  loadSettings() {
    if (localStorage.getItem("settings")) {
      this.ajustes = JSON.parse(localStorage.getItem("settings"));
      
      this.applyTheme( this.ajustes.tema);
    } else {
    }
  }

  applyTheme(theme:string){
    let url =  `assets/css/colors/${ theme }.css`;
    this._document.getElementById('themeApp').setAttribute('href', url);
    
    this.ajustes.tema = theme;
    this.ajustes.temaUrl = url;
    this.saveSettings();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
