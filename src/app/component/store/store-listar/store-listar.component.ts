import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from 'src/app/model/store';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-store-listar',
  templateUrl: './store-listar.component.html',
  styleUrls: ['./store-listar.component.css']
})
export class StoreListarComponent implements OnInit{
  dataSource: MatTableDataSource<Store> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'tienda',
    'direccion',
    'telefono',
    'postal',
    'pago',
    'longitud',
    'latitud',
    'catalogoTienda',
    'accion01',
    'accion02'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cS: StoreService) {}
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
