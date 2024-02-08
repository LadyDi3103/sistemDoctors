import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent {
  @Input() totalPacientesMayoresEdad: any = 0;
  @Input() totalPacientesMenoresEdad: any = 0;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public pieChartOptions: ChartConfiguration['options'] = {};

  get pieChartData(): ChartData<'doughnut', number[], string | string[]>  {
    // setInterval(()=>{
    //   this.totalPacientesMayoresEdad= 30;
    // },5000)
    // console.log("ENTRA");
    
    return{
      labels: ['Menores', 'Mayores'],
      datasets: [
        {
          data: [this.totalPacientesMenoresEdad,this.totalPacientesMayoresEdad],
        },
      ],
    }
  };

  public pieChartType: ChartType = 'doughnut';
  public pieChartPlugins = [DatalabelsPlugin];

  constructor() {}
}
