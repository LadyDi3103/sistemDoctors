import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    const headers = new HttpHeaders({
      accept: 'application/json',
    });
    return this.httpClient.post(
      environment.BASE_URL_BACK + '/pacientes/createPaciente',
      datos,
      { headers }
    );
  }

  getPacienteById(pacienteId: string): Observable<any> {
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

  editarPaciente(paciente: any): Observable<any> {
    const headers = new HttpHeaders({
      accept: 'application/json',
    });
    const body = {
      paciente: paciente.paciente,
      IdTipoDocumento: paciente.IdTipoDocumento,
      NumeroDocumento: paciente.NumeroDocumento,
      Num_Cel: paciente.Num_Cel,
      Email: paciente.Email,
      Domicilio: paciente.Domicilio,
    };

    console.log('BODY 70: ', body);

    console.log('PACIENTE: ', paciente);

    return this.httpClient.patch<any>(
      environment.BASE_URL_BACK +
        '/pacientes/editPaciente' +
        `/${paciente.IdPaciente}`,
      body,
      { headers }
    );
  }

  eliminarPaciente(paciente: any): Observable<any> {
    if (paciente) {
      const body = {
        tipDocum: paciente.IdTipoDocumento,
        codDocum: paciente.NumeroDocumento,
      };
      return this.httpClient.post<any>(
        environment.BASE_URL_BACK +
          environment.URL_ENDPOINT_PACIENTES +
          `/${paciente.IdPaciente}`,
        body
      );
    } else {
      console.error('El objeto paciente es undefined');
      return of(null);
    }
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
