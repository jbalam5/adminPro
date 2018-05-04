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
    }
  ];
  constructor() { }

}
