import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PacientesService } from 'src/app/services/pacientes/pacientes.service';

@Component({
  selector: 'app-stadistics',
  templateUrl: './stadistics.component.html',
  styleUrls: ['./stadistics.component.css']
})
export class StadisticsComponent {
  totalPacientes =0
  totalPacientesMayoresEdad=0
  totalPacientesMenoresEdad=0
  constructor(private pacientesService: PacientesService){

  }

  ngOnInit(): void {
    this.getPacientes()
  }
  async getPacientes(){

    const result= await firstValueFrom(this.pacientesService.getAllPacientes())
    console.log(result);
    this.totalPacientesMayoresEdad= result.filter((paciente:any)=>paciente.edad>=18).length;
    this.totalPacientesMenoresEdad= result.filter((paciente:any)=>paciente.edad<18).length;
    this.totalPacientes= result.length;
  }
}
