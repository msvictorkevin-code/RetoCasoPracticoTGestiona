import { Component, OnInit } from '@angular/core';
import {Sucursal} from '../models/Sucursal';
import {SucursalService} from '../service/sucursal.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-sucursal',
  templateUrl: './form-sucursal.component.html',
  styleUrls: ['./form-sucursal.component.css']
})
export class FormSucursalComponent implements OnInit {

  sucursal: Sucursal = new Sucursal();
  private nomSucursal: string;

  constructor(private service: SucursalService, private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarSucursal();
  }

  registrar() {
    this.nomSucursal = this.sucursal.nombre;
    this.service.create(this.sucursal).subscribe(sucursal => {
      Swal.fire('Nuevo Sucursal', `Sucursal ${this.nomSucursal} ha sido creado con exito!`, 'success');
      this.router.navigate(['/sucursal']);
    },err => {
      console.error('Codigo del error desde el backend:'+err.status);
      console.error(err.error.errors);
    });

  }

  actualizar() {
    this.service.update(this.sucursal).subscribe(
      json => {
        this.router.navigate(['/sucursal']);
      },
      err => {
        console.error('Codigo del error desde el backend:'+err.status);
        console.error(err.error.errors);
      }
    );
  }

   cargarSucursal() {
     this.activatedRoute.params.subscribe(params => {
       let id = params['id'];
       if (id) {
         this.service.getSucursal(id)
           .subscribe((sucursal) => this.sucursal = sucursal);
         console.log(this.sucursal);
       }
     });
  }


}

