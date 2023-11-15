import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Suscription } from 'src/app/model/suscription';
import { SuscriptionService } from 'src/app/service/suscription.service';

@Component({
  selector: 'app-suscription-listar',
  templateUrl: './suscription-listar.component.html',
  styleUrls: ['./suscription-listar.component.css']
})
export class SuscriptionListarComponent implements OnInit{
  dataSource: MatTableDataSource<Suscription> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'monto',
    'fechaPago',
    'estado',
    'fechaInicio',
    'usuarios',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cS: SuscriptionService) {}
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
