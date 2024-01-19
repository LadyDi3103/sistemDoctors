import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent {
  @Input() totalPacientesHombres0_10: any = 0;
  @Input() totalPacientesMujeres0_10: any = 0;
  @Input() totalPacientesHombres11_20: any = 0;
  @Input() totalPacientesMujeres11_20: any = 0;
  @Input() totalPacientesHombres21_30: any = 0;
  @Input() totalPacientesMujeres21_30: any = 0;
  @Input() totalPacientesHombres31_40: any = 0;
  @Input() totalPacientesMujeres31_40: any = 0;
  @Input() totalPacientesHombres40_60: any = 0;
  @Input() totalPacientesMujeres40_60: any = 0;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public barChartOptions: ChartConfiguration['options'] = {
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  get barChartData(): ChartData<'bar', number[][], string | string[]> {
    return {
      labels: ['0-10', '11-20', '21-30', '31-40', '41-60'],
      datasets: [
        {
          label: 'Hombres',
          data: [
            [this.totalPacientesHombres0_10],
            [this.totalPacientesHombres11_20],
            [this.totalPacientesHombres21_30],
            [this.totalPacientesHombres31_40],
            [this.totalPacientesHombres40_60],
          ],
          backgroundColor: 'blue',
        },
        {
          label: 'Mujeres',
          data: [
            [this.totalPacientesMujeres0_10],
            [this.totalPacientesMujeres11_20],
            [this.totalPacientesMujeres21_30],
            [this.totalPacientesMujeres31_40],
            [this.totalPacientesMujeres40_60],
          ],
          backgroundColor: 'pink',
        },
      ],
    };
  }

  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DatalabelsPlugin];

  constructor() {
    // Datos ficticios
    setInterval(() => {
      this.totalPacientesHombres0_10 = Math.floor(Math.random() * 10);
      this.totalPacientesMujeres0_10 = Math.floor(Math.random() * 10);
      this.totalPacientesHombres11_20 = Math.floor(Math.random() * 10);
      this.totalPacientesMujeres11_20 = Math.floor(Math.random() * 10);
      this.totalPacientesHombres21_30 = Math.floor(Math.random() * 10);
      this.totalPacientesMujeres21_30 = Math.floor(Math.random() * 10);
      this.totalPacientesHombres31_40 = Math.floor(Math.random() * 10);
      this.totalPacientesMujeres31_40 = Math.floor(Math.random() * 10);
      this.totalPacientesHombres40_60 = Math.floor(Math.random() * 10);
      this.totalPacientesMujeres40_60 = Math.floor(Math.random() * 10);
    }, 5000);
  }
}
