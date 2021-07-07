import { Component, OnInit } from '@angular/core';
import {ProductoService} from './service/producto.service';
import {Producto} from './models/Producto';
import Swal from "sweetalert2";


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  displayedColumns: string[] = ['codProducto', 'nombre', 'precio' , 'acciones' ];
  dataSource: Producto[];

  constructor(private service: ProductoService ) { }

  ngOnInit(): void {
    this.service.getProductos().subscribe( response => {
      this.dataSource = response  as Producto[] ;
    });
  }


  eliminar(producto: Producto): void {
    console.log(producto);
    Swal.fire({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar la producto ${producto.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(producto.codProducto).subscribe(
          response => {
            this.dataSource = this.dataSource.filter(cli => cli !== producto);
          }
        );
        Swal.fire(
          'Producto Eliminado!',
          `Producto ${producto.nombre} eliminado con exito.`,
          'success'
        );
      }
    });
  }
}
