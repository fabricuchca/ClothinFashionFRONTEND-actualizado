import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Season } from 'src/app/model/season';
import { SeasonService } from 'src/app/service/season.service';

@Component({
  selector: 'app-season-listar',
  templateUrl: './season-listar.component.html',
  styleUrls: ['./season-listar.component.css']
})
export class SeasonListarComponent {
  dataSource: MatTableDataSource<Season> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'inicio',
    'fin',
    'descripcion',
    'accion01',
    'accion02'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cS: SeasonService) {}
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
