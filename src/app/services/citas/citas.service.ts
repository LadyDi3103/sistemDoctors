import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  {firstValueFrom, map} from 'rxjs'
import {environment}from 'src/environments/environment'
@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private http:HttpClient) { }


  getCitas(){
    return this.http.get(`${environment.BASE_URL_BACK}/citas`).pipe(map((res:any)=>{
      console.log(res,"RESPONSE");
      
      return res.result;
    }));
  }
}
