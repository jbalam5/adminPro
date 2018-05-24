import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Dashboard',
          url: '/dashboard'
        },
        {
          titulo: 'ProgresBar',
          url: '/progress'
        },
        {
          titulo: 'Gráficas',
          url: '/graficas1'
        },{
          titulo: 'promesas',
          url: '/promesas'
        },
        { titulo: 'observables',
          url: '/observables'
        }
      ]
    },
    {
      titulo: "Mantenimiento",
      icono: "mdi mdi-folder-lock-open",
      submenu: [
        { titulo: "Usuarios", 
          url: "/usuarios" 
        },
        { 
          titulo: "Hospitales", 
          url: "/hospitales" 
        },
        { 
          titulo: "Medicos", 
          url: '/medicos' 
        }
      ]
    }
  ];
  constructor() { }

}
