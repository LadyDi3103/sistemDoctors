import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DataUserEdit } from '../../interfaces/interfaces';
import { of } from 'rxjs'; // Asegúrate de importar 'of' de 'rxjs'
import { Paciente } from '../../views/dashboard/Pacientes/pacientes/pacientes.component';
@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private router: Router, private httpClient: HttpClient) { } 

  crearPaciente(datos: any): Observable<any>{
    const headers = new HttpHeaders({
      'accept': 'application/json',
    })
    return this.httpClient.post(environment.BASE_URL_BACK+environment.URL_ENDPOINT_PACIENTES, datos, {headers} );
    }
  
    getAllPacientes():Observable<any>{
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      return this.httpClient.get(environment.BASE_URL_BACK + environment.URL_ENDPOINT_PACIENTES, options);
    }

    // editarPaciente(userData: DataUserEdit): Observable<any> {
    //   const headers = new HttpHeaders({
    //     'accept': 'application/json',
    //   })
    //   return this.httpClient.patch<any>(environment.BASE_URL_BACK + environment.URL_ENDPOINT_PACIENTES+`${userData.id}`, userData,{headers});
    // }

    editarPaciente(paciente: any): Observable<any> {
      const headers = new HttpHeaders({
        'accept': 'application/json',
      })
      const body = {
        tipDocum: paciente.IdTipoDocumento,
        codDocum: paciente.NumeroDocumento
      };
      return this.httpClient.patch<any>(environment.BASE_URL_BACK + environment.URL_ENDPOINT_PACIENTES+`${paciente.id}`, body,{headers});
    }
  
    eliminarPaciente(paciente: any): Observable<any> {
      if(paciente){
        const body = {
          tipDocum: paciente.IdTipoDocumento,
          codDocum: paciente.NumeroDocumento
        };
        return this.httpClient.post<any>(environment.BASE_URL_BACK + environment.URL_ENDPOINT_ELIMINAR_PACIENTE,body);
      } else{
        console.error('El objeto paciente es undefined');
        return of(null);
      }  
    }






  }






























// public menu: any = [
// {
//   titulo: 'Doctores',
//   icono: '',
//   submenu: [
//     {titulo: 'Datos del doctor', url: '/dashboard/datos-doctor'}
//   ]
// },
// {
//   titulo: 'Pacientes',
//   icono: '',
//   submenu: [
//     {titulo: 'Registrar Paciente', url: '/dashboard/crear-paciente'},
//     {titulo: 'Datos deñ Paciente', url: '/dashboard/datos-paciente'}
//   ]
// },
// {
//   titulo: 'Historial Clínico',
//   icono: '',
//   submenu: [
//     {titulo: 'Nuevo Historial', url: '/dashboard/nuevo-historial'},
//     {titulo: 'Historial', url: '/dashboard/historial-paciente'}
//   ]
// }
// ]