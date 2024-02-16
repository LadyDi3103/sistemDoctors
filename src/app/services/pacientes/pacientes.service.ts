import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataUserEdit } from '../../interfaces/interfaces';
import { of } from 'rxjs'; // Asegúrate de importar 'of' de 'rxjs'
import { Paciente } from '../../views/Pacientes/pacientes.component';



@Injectable({
  providedIn: 'root',
})
export class PacientesService {
  constructor(private router: Router, private httpClient: HttpClient) {}

  crearPaciente(datos: any): Observable<any> {
    console.log(datos, 'DATOS SERVICEEEEE');
    
    const headers = new HttpHeaders({
      accept: 'application/json',
    });
    return this.httpClient.post(
      environment.BASE_URL_BACK + '/pacientes/createPaciente',
      datos,
      { headers }
    );
  }

  getPacienteById(pacienteId: any): Observable<any> {
    console.log(pacienteId, 'pacienteIDDDDDD')
    const headers = new HttpHeaders({
      accept: 'application/json',
    });

    return this.httpClient.get<any>(
      `${environment.BASE_URL_BACK}/pacientes/getPaciente/${pacienteId}`,
      { headers }
    );
  }

  getAllPacientes(): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.get(
      environment.BASE_URL_BACK + '/pacientes/getPacientes',
      options
    );
  }

  editPaciente(paciente: any): Observable<any> {
     const headers = new HttpHeaders({
      accept: 'application/json',
    });
    const body = {
      nom_paciente: paciente.nom_paciente,
      ape_paciente: paciente.ape_paciente,
      IdTipoDocumento: paciente.IdTipoDocumento,
      num_Documento: paciente.num_Documento,
      num_Cel: paciente.num_Cel,
      email: paciente.email,
      Domicilio: paciente.Domicilio,
    };
    return this.httpClient.patch<any>(
      environment.BASE_URL_BACK +
        '/pacientes/editPaciente' +
        `/${paciente.id}`,
      body,
      { headers }
    );
  }

  eliminarPaciente(id: any): Observable<any> {
    console.log(id, 'ID del paciente');
    
    if (!id) {
      console.error('El ID del paciente es undefined');
      return of(null);
    }
  
    return this.httpClient.delete<any>(
      `${environment.BASE_URL_BACK}${environment.URL_ENDPOINT_PACIENTES}/deletePaciente/${id}`
    );
  }


  getCitaData(paciente: any): Observable<any> {
    const headers = new HttpHeaders({
      accept: 'application/json',
    });

    return this.httpClient.get<any>(
      environment.BASE_URL_BACK +
        environment.URL_ENDPOINT_PACIENTES +
        `/${paciente.IdPaciente}`,
      { headers }
    );
  }
}
