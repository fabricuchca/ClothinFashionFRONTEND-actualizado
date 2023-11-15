import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-reporte-cuchca',
  templateUrl: './reporte-cuchca.component.html',
  styleUrls: ['./reporte-cuchca.component.css']
})
export class ReporteCuchcaComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private pS: UsersService) {}
  ngOnInit(): void {
    this.pS.getCountClosetByUser().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nameUsers);
      this.barChartData = [
        {
          data: data.map((item) => item.quantityCloset),
          label:'Cantidad Total de Armarios',
          backgroundColor:'rgba(0,0,255,0.5)'
        },
      ];
    });
  }
}
