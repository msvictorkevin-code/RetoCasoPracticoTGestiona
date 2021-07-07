import { Component, OnInit } from '@angular/core';
import {Producto} from '../models/Producto';
import {ProductoService} from '../service/producto.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {

  producto: Producto = new Producto();
  private nomProducto :string;

  constructor(private service: ProductoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarProducto();
  }

  registrar(): void {
    this.nomProducto = this.producto.nombre;
    this.service.create(this.producto).subscribe(prod => {
      Swal.fire('Nuevo Producto', `Producto ${ this.nomProducto } ha sido creado con exito!`, 'success');
      this.router.navigate(['/producto']);
    },err => {
      console.error('Codigo del error desde el backend:'+err.status);
      console.error(err.error.errors);
    });
  }

  actualizar():void{
    this.service.update(this.producto).subscribe(
      json => {
        this.router.navigate(['/producto']);
      },
      err => {
        console.error('Codigo del error desde el backend:'+err.status);
        console.error(err.error.errors);
      }
    );
  }

  cargarProducto():void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.service.getProducto(id)
          .subscribe((producto) => this.producto = producto);
        console.log(this.producto);
      }
    });
  }
}
