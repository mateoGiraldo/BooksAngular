defineLocale('es', esLocale);

//Librerías
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

//Componentes
import { AppComponent } from './app.component';
import { LibrosComponent } from './components/libros/libros.component';


//Servicios
import { DataTablesOptionsService } from './services/data-tables-options.service';
import { ApiService } from './services/api.service';

//Modulos
import { defineLocale, esLocale } from 'ngx-bootstrap/chronos';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LibrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    DataTablesOptionsService,
    BsLocaleService,
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
