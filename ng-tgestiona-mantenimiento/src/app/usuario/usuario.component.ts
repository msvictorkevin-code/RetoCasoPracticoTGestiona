import { Component, OnInit } from '@angular/core';
import {Usuario} from './models/Usuario';
import {UsuarioService} from './service/usuario.service';
import {Sucursal} from '../sucursal/models/Sucursal';
import Swal from "sweetalert2";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {


  displayedColumns: string[] = ['codUsuario', 'nombre','user','password','sucursal' ,'acciones' ];
  dataSource: Usuario[];

  constructor(private service: UsuarioService) { }

  ngOnInit(): void {
    this.service.getUsuarios().subscribe( response => {
      this.dataSource = response  as Usuario[] ;
    });
  }

  eliminar(usuario: Usuario): void {
    console.log(usuario);
    Swal.fire({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar la usuario ${usuario.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(usuario.codUsuario).subscribe(
          response => {
            this.dataSource = this.dataSource.filter(cli => cli !== usuario);
          }
        );
        Swal.fire(
          'Usuario Eliminado!',
          `Usuario ${usuario.nombre} eliminado con exito.`,
          'success'
        );
      }
    });
  }
}
