import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { LoginGuardGuard } from "../services/service.index";
import { ProfilesComponent } from "./profiles/profiles.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";

const pagesRoutes: Routes = [
    { 
        path: '', 
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progresbar' } },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Configuración' } },
            { path: 'profile', component: ProfilesComponent, data: { titulo: 'Perfil de usuario' } },
            // MANTENIMIENTO
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios' } },
            { path: 'observables', component: RxjsComponent, data: { titulo: 'Observable RXJS' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);