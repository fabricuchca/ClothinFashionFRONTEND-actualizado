import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Recommendations } from 'src/app/model/recommendations';
import { RecommendationsService } from 'src/app/service/recommendations.service';

@Component({
  selector: 'app-recommendations-listar',
  templateUrl: './recommendations-listar.component.html',
  styleUrls: ['./recommendations-listar.component.css']
})
export class RecommendationsListarComponent implements OnInit {
  dataSource: MatTableDataSource<Recommendations> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'titulo',
    'autor',
    'calificacion',
    'link',
    'tag',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cS: RecommendationsService) {}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
}
