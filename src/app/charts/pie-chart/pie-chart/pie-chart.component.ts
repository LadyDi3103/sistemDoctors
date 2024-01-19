import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
  @Input() totalPacientesMayoresEdad: any = 0;
  @Input() totalPacientesMenoresEdad: any = 0;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public pieChartOptions: ChartConfiguration['options'] = {};

  get pieChartData(): ChartData<'pie', number[], string | string[]>  {
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

  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  constructor() {}
}
