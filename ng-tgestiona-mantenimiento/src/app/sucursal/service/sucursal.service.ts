import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Sucursal} from '../models/Sucursal';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  private urlEndPoint: string = 'http://localhost:8080/api/sucursal';
  private httpHeader = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getSucursales(): Observable<Sucursal[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => {
        let sucursal = response as Sucursal[];
        return sucursal.map(sucur => {
          sucur.nombre = sucur.nombre.toUpperCase();
          return sucur;
        });
      })
    );
  }

  getSucursal(id): Observable<Sucursal> {
    return this.http.get<Sucursal>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/sucursal']);
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

  create(sucursal: Sucursal): Observable<Sucursal>{
    return this.http.post(this.urlEndPoint, sucursal, {headers: this.httpHeader}).pipe(
      map((response: any) => response.Sucursal as Sucursal),
      catchError(e => {

        if (e.status === 400) {
          return throwError(e);
        }
        console.error(e.error);
        Swal.fire(
          'Error al crear sucursal!',
          e.error.mensaje,
          'error'
        );
        return throwError(e);
      })
    );
    }


  update(sucursal: Sucursal): Observable<any> {
    console.log(sucursal);
    return this.http.put<any>(`${this.urlEndPoint}/${sucursal.codSucursal}`, sucursal, {headers: this.httpHeader}).pipe(
      catchError(e => {
        console.error(e.error);
        Swal.fire(
          'Error al actualizar sucursal!',
          e.error.mensaje,
          'error'
        )
        return throwError(e);
      })
    );
  }

  delete(id: string): Observable<Sucursal> {
    return this.http.delete<Sucursal>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeader}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire(
          'Error al eliminar sucursal!',
          e.error.mensaje,
          'error'
        );
        return throwError(e);
      })
    );
  }

}
