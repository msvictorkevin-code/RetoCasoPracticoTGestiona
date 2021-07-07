import {Component, OnInit} from '@angular/core';

import {Usuario} from '../models/Usuario';
import {SucursalService} from '../../sucursal/service/sucursal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from '../service/usuario.service';
import {Sucursal} from '../../sucursal/models/Sucursal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  sucursales: Sucursal[];
  private nomUsuario: string;

  constructor(private serviceSucursal: SucursalService,
              private serviceUsuario: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.cargarSucursal();
    this.cargarUsuario();
  }

  registrar(): void {
    this.nomUsuario = this.usuario.nombre;
    this.serviceUsuario.create(this.usuario).subscribe(prod => {
      Swal.fire('Nuevo Usuario', `Usuario ${ this.nomUsuario } ha sido creado con exito!`, 'success');
      this.router.navigate(['/usuario']);
    },err => {
      console.error('Codigo del error desde el backend:'+err.status);
      console.error(err.error.errors);
    });
  }

  actualizar(): void {
    this.serviceUsuario.update(this.usuario).subscribe(
      json => {
        this.router.navigate(['/usuario']);
      },
      err => {
        console.error('Codigo del error desde el backend:'+err.status);
        console.error(err.error.errors);
      }
    );
  }

  cargarSucursal(): void {
    this.serviceSucursal.getSucursales()
      .subscribe((sucursales) =>
        this.sucursales = sucursales);
    console.log(this.sucursales);

  }

  cargarUsuario():void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.serviceUsuario.getUsuario(id)
          .subscribe((usuario) => this.usuario = usuario);
        console.log(this.usuario);
      }
    });
  }

  compararSucursal(o1: Sucursal, o2: Sucursal): boolean {
    if( o1 === undefined && o2 === undefined){
      return true;
    }
    return o1 === null || o2 === null ||o1 === undefined||o2 === undefined? false : o1.codSucursal === o2.codSucursal;
  }

}

