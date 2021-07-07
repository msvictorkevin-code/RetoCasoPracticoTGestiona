import { Component, OnInit } from '@angular/core';
import {SucursalService} from './service/sucursal.service';
import {Sucursal} from './models/Sucursal';
import Swal from "sweetalert2";

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {


  displayedColumns: string[] = ['codSucursal', 'nombre', 'acciones' ];
  dataSource: Sucursal[];



  constructor(private service: SucursalService ) { }

  ngOnInit(): void {

    this.service.getSucursales().subscribe( response => {
      this.dataSource = response  as Sucursal[] ;
    });
  }

  eliminar(sucursal: Sucursal): void {
    console.log(sucursal);
    Swal.fire({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar la sucursal ${sucursal.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(sucursal.codSucursal).subscribe(
          response => {
            this.dataSource = this.dataSource.filter(cli => cli !== sucursal);
          }
        );
        Swal.fire(
          'Sucursal Eliminado!',
          `Sucursal ${sucursal.nombre} eliminado con exito.`,
          'success'
        );
      }
    });
  }


}

