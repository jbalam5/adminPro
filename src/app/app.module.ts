import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Rutas
import { APP_ROUTES } from './app.routes';
// Modulos
import { PagesModule } from './pages/pages.module';
// componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
// temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServiceModule } from './services/service.module';
// import { SettingsService } from './services/settings.service';
ServiceModule
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
