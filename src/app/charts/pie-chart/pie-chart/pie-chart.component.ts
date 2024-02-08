import {
  ChangeDetectorRef,
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
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnChanges {
  @Input() chartData: any;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
    },
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };

  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  constructor(private cdr: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] && this.chartData) {
      console.log(this.chartData, 'cha');
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    if (this.chartData && this.chartData.length > 0) {
      this.pieChartData.datasets[0].data = this.chartData.map(
        (item: any) => item.data
      );
      this.pieChartData.labels = this.chartData.map((item: any) => item.label);
      this.chart?.update();
      // this.cdr.detectChanges(); // Forzar detección de cambios
    }
  }
}
