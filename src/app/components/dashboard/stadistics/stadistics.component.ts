
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CitasService } from 'src/app/services/citas/citas.service';
import { PacientesService } from 'src/app/services/pacientes/pacientes.service';

@Component({
  selector: 'app-stadistics',
  templateUrl: './stadistics.component.html',
  styleUrls: ['./stadistics.component.css'],
})
export class StadisticsComponent implements OnInit {
  totalPacientes = 0;
  totalPacientesMayoresEdad = 0;
  totalPacientesMenoresEdad = 0;
  ultimosPacientesMes = 0;
  pacientesAtendidosMes = 0;
  chartData: any[] = [];
  dataCitas: any[] = [];
  constructor(
    private pacientesService: PacientesService,
    private citasService: CitasService
  ) {}

  ngOnInit(): void {
    this.getPacientes();
    this.getCitas();
  }

  async getPacientes() {
    const result = await firstValueFrom( 
      this.pacientesService.getAllPacientes()
    );
    this.updateChartData(result);
    this.totalPacientesMayoresEdad = result.filter(
      (paciente: any) => paciente.edad >= 18
    ).length;
    this.totalPacientesMenoresEdad = result.filter(
      (paciente: any) => paciente.edad < 18
    ).length;
    this.totalPacientes = result.length;

    const currentDate = new Date();
    const lastMonthPacientes = result.filter((paciente: any) => {
      const pacienteDate = new Date(paciente.created_at);
      return (
        pacienteDate.getMonth() === currentDate.getMonth() &&
        pacienteDate.getFullYear() === currentDate.getFullYear()
      );
    });

    this.ultimosPacientesMes = lastMonthPacientes.length;
  }

  async getCitas() {
    const result = await firstValueFrom(this.citasService.getCitas());
    console.log(result, 'RESULT 3222');
    this.dataCitas = result;
    const currentDate = new Date();
    const lastMonthPacientes: [] = result.filter((cita: any) => {
      const pacienteDate = new Date(cita.created_at);
      return (
        pacienteDate.getMonth() === currentDate.getMonth() &&
        pacienteDate.getFullYear() === currentDate.getFullYear()
      );
    });
    this.pacientesAtendidosMes = lastMonthPacientes.length;
  }

  private updateChartData(result: any[]): void {
    this.chartData = [
      {
        label: '18-24',
        // data: result.filter(
        //   (paciente: any) => paciente.edad >= 18 && paciente.edad <= 24
        // ).length,
      },
      {
        label: '25-34',
        data: result.filter(
          (paciente: any) => paciente.edad >= 25 && paciente.edad <= 34
        ).length,
      },
      {
        label: '35-44',
        data: result.filter(
          (paciente: any) => paciente.edad >= 35 && paciente.edad <= 44
        ).length,
      },
      {
        label: '45-54',
        // data: result.filter(
        //   (paciente: any) => paciente.edad >= 45 && paciente.edad <= 54
        // ).length,
      },
      {
        label: '55-64',
        // data: result.filter(
        //   (paciente: any) => paciente.edad >= 55 && paciente.edad <= 64
        // ).length,
      },
      {
        label: '+65',
        data: result.filter((paciente: any) => paciente.edad >= 65).length,
      },
    ];
  }
}
