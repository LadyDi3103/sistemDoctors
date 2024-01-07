import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs'; // Asegúrate de importar 'of' de 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor(private httpClient: HttpClient) { }

  crearMedico(datos: any): Observable<any>{
    const headers = new HttpHeaders({
      'accept': 'application/json',
    })
    return this.httpClient.post(environment.BASE_URL_BACK+environment.URL_ENDPOINT_MEDICOS, datos, {headers} );
    }

  // Método get para traernos a todos los médicos
  getAllMedicos():Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.get(environment.BASE_URL_BACK + environment.URL_ENDPOINT_MEDICOS);
  }

  editarMedico(doctor: any): Observable<any> {
    console.log("MEDICO SERVICE doctor",doctor);
    
    const headers = new HttpHeaders({
      'accept': 'application/json',
    })
    const body = {
      id_medico: doctor.id_medico,
      nom_medico: doctor.nom_medico,
      ape_medico: doctor.ape_medico,
      tip_docum: doctor.tip_docum,
      cod_docum: doctor.cod_docum,
      celular: doctor.celular,
      email: doctor.email,
      direccion: doctor.direccion,
    };

    console.log("BODY DOCTOR 45: ", body );
    
    console.log("RUTAAA",environment.BASE_URL_BACK + environment.URL_ENDPOINT_MEDICOS+`/${doctor.id_medico}`, body,{headers});
    
    return this.httpClient.patch<any>(environment.BASE_URL_BACK + environment.URL_ENDPOINT_MEDICOS+`/${doctor.id_medico}`, body,{headers});
    
  }

  eliminarMedico(doctor: any): Observable<any> {
    if(doctor){
      const body = {
        tipDocum: doctor.tip_docum,
        codDocum: doctor.cod_docum,
      };
      return this.httpClient.post<any>(environment.BASE_URL_BACK + environment.URL_ENDPOINT_ELIMINAR_MEDICO,body);
    } else{
      console.error('El objeto doctor es undefined');
      return of(null);
    }  
  }
}