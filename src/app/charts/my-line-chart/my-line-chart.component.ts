import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-my-line-chart',
  templateUrl: './my-line-chart.component.html',
  styleUrls: ['./my-line-chart.component.css']
})
export class MyLineChartComponent implements OnChanges {
  @Input() totalPacientesMayoresEdad: any = 0;
  @Input() totalPacientesMenoresEdad: any = 0;

  public pieChartOptions: ChartConfiguration['options'] = {
    // ... tus opciones de gráfica ...
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Menores', 'Mayores'],
    datasets: [
      {
        data: [0,0],
      },
    ],
  };

  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    // Este método se llama cuando hay cambios en las propiedades de entrada
    if (changes['totalPacientesMayoresEdad'] || changes['totalPacientesMenoresEdad']) {
      this.actualizarGrafica();
    }
  }

  private actualizarGrafica(): void {
    // Actualizar los datos de la gráfica con los nuevos valores
    this.pieChartData = {
      labels: ['Menores', 'Mayores'],
      datasets: [
        {
          data: [this.totalPacientesMenoresEdad, this.totalPacientesMayoresEdad],
        },
      ],
    };
  }
}