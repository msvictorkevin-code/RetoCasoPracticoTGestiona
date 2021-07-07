import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {RouterModule, Routes} from '@angular/router';
import { SucursalComponent } from './sucursal/sucursal.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProductoComponent } from './producto/producto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SucursalService} from './sucursal/service/sucursal.service';
import {HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { FormSucursalComponent } from './sucursal/form-sucursal/form-sucursal.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import { FormProductoComponent } from './producto/form-producto/form-producto.component';
import { FormUsuarioComponent } from './usuario/form-usuario/form-usuario.component';
import {UsuarioService} from './usuario/service/usuario.service';
import {ProductoService} from './producto/service/producto.service';

const ROUTES: Routes = [
  {path: '', redirectTo: '/sucursal', pathMatch: 'full'},
  {path: 'sucursal', component: SucursalComponent},
  {path: 'sucursal/form', component: FormSucursalComponent},
  {path: 'sucursal/form/:id', component: FormSucursalComponent},
  {path: 'producto', component: ProductoComponent},
  {path: 'producto/form', component: FormProductoComponent},
  {path: 'producto/form/:id', component: FormProductoComponent},
  {path: 'usuario', component: UsuarioComponent},
  {path: 'usuario/form', component: FormUsuarioComponent},
  {path: 'usuario/form/:id', component: FormUsuarioComponent}


];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SucursalComponent,
    UsuarioComponent,
    ProductoComponent,
    FormSucursalComponent,
    FormProductoComponent,
    FormUsuarioComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule
  ],
  providers: [SucursalService, UsuarioService , ProductoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
