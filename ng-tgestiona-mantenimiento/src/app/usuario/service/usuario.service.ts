import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import Swal from "sweetalert2";
import {Usuario} from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint: string = 'http://localhost:8080/api/usuario';
  private httpHeader = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => {
        let usuario = response as Usuario[];
        return usuario.map(usua => {
          usua.nombre = usua.nombre.toUpperCase();
          return usua;
        });
      })
    );
  }

  getUsuario(id): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/usuario']);
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

  create(usuario: Usuario): Observable<Usuario>{
    return this.http.post(this.urlEndPoint, usuario, {headers: this.httpHeader}).pipe(
      map((response: any) => response.Usuario as Usuario),
      catchError(e => {

        if (e.status === 400) {
          return throwError(e);
        }
        console.error(e.error);
        Swal.fire(
          'Error al crear usuario!',
          e.error.mensaje,
          'error'
        );
        return throwError(e);
      })
    );
  }


  update(usuario: Usuario): Observable<any> {
    console.log(usuario);
    return this.http.put<any>(`${this.urlEndPoint}/${usuario.codUsuario}`, usuario, {headers: this.httpHeader}).pipe(
      catchError(e => {
        console.error(e.error);
        Swal.fire(
          'Error al actualizar usuario!',
          e.error.mensaje,
          'error'
        );
        return throwError(e);
      })
    );
  }

  delete(id: string): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeader}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire(
          'Error al eliminar usuario!',
          e.error.mensaje,
          'error'
        );
        return throwError(e);
      })
    );
  }

}
