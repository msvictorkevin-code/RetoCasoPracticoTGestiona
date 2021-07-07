import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Producto} from '../models/Producto';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlEndPoint: string = 'http://localhost:8080/api/producto';
  private httpHeader = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => {
        let producto = response as Producto[];
        return producto.map(prod => {
          prod.nombre = prod.nombre.toUpperCase();
          return prod;
        });
      })
    );
  }

  getProducto(id): Observable<Producto> {
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/producto']);
        console.log(e.error.mensaje);
        Swal.fire(
          'Error al editar!',
          e.error.mensaje,
          'error'
        );
        return throwError(e);
      })
    );
  }

  create(producto: Producto): Observable<Producto>{
    return this.http.post(this.urlEndPoint, producto, {headers: this.httpHeader}).pipe(
      map((response: any) => response.producto as Producto),
      catchError(e => {

        if (e.status === 400) {
          return throwError(e);
        }
        console.error(e.error);
        Swal.fire(
          'Error al crear producto!',
          e.error.mensaje,
          'error'
        );
        return throwError(e);
      })
    );
  }


  update(producto: Producto): Observable<any> {
    console.log(producto);
    return this.http.put<any>(`${this.urlEndPoint}/${producto.codProducto}`, producto, {headers: this.httpHeader}).pipe(
      catchError(e => {
        console.error(e.error);
        Swal.fire(
          'Error al actualizar producto!',
          e.error.mensaje,
          'error'
        );
        return throwError(e);
      })
    );
  }

  delete(id: string): Observable<Producto> {
    return this.http.delete<Producto>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeader}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire(
          'Error al eliminar producto!',
          e.error.mensaje,
          'error'
        );
        return throwError(e);
      })
    );
  }

}
