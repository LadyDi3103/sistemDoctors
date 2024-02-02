import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs'; // Asegúrate de importar 'of' de 'rxjs'
@Injectable({
  providedIn: 'root',
})
export class MedicosService {
  constructor(private httpClient: HttpClient) {}

  crearMedico(datos: any): Observable<any> {
    const headers = new HttpHeaders({
      accept: 'application/json',
    });
    return this.httpClient.post(
      environment.BASE_URL_BACK + '/medicos/createMedico',
      datos,
      { headers }
    );
  }

  // Método get para traernos a todos los médicos
  getAllMedicos(): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.get(environment.BASE_URL_BACK + '/medicos');
  }

  editarMedico(doctor: any): Observable<any> {
    console.log('MEDICO SERVICE doctor', doctor);

    const headers = new HttpHeaders({
      accept: 'application/json',
    });
    const body = {
      nom_medico: doctor.nom_medico,
      ape_medico: doctor.ape_medico,
      tip_docum: doctor.tip_docum,
      cod_docum: doctor.cod_docum,
      celular: doctor.celular,
      email: doctor.email,
      direccion: doctor.direccion,
    };

    console.log('BODY DOCTOR 45: ', body);

    return this.httpClient.patch<any>(
      environment.BASE_URL_BACK + `/medicos/editMedico/${doctor.id}`,
      body,
      { headers }
    );
  }

  eliminarMedico(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      environment.BASE_URL_BACK + `/medicos/deleteMedico/${id}`
    );
  }
}
