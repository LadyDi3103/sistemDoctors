import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-my-line-chart',
  templateUrl: './my-line-chart.component.html',
  styleUrls: ['./my-line-chart.component.css']
})
export class MyLineChartComponent {
  @Input() totalPacientesMayoresEdad: any = 0;
  @Input() totalPacientesMenoresEdad: any = 0;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public pieChartOptions: ChartConfiguration['options'] = {};

  get pieChartData(): ChartData<'line', number[], string | string[]>  {
    // setInterval(()=>{
    //   this.totalPacientesMayoresEdad= 30;
    // },5000)
    // console.log("ENTRA");
    
    return{
      labels: ['Menores', 'Mayores'],
      datasets: [
        {
          data: [this.totalPacientesMenoresEdad],
        },
        {
          data: [this.totalPacientesMayoresEdad],
        },
      ],
    }
  };

  public pieChartType: ChartType = 'line';
  public pieChartPlugins = [DatalabelsPlugin];

  constructor() {}

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes?.['totalPacientesMayoresEdad'] || changes?.['totalPacientesMenoresEdad']) {
  //     this.updateChartData();
  //   }
  // }

  // private updateChartData() {
  //   this.pieChartData.datasets[0].data = [this.totalPacientesMayoresEdad, this.totalPacientesMenoresEdad];
  //   // Forzar la actualización del gráfico
  //   if (this.chart) {
  //     this.chart.update();
  //   }
  // }
}
