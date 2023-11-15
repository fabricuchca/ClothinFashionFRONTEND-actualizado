import { LoginService } from './../../../service/login.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Closet } from 'src/app/model/closet';
import { ClosetService } from 'src/app/service/closet.service';

@Component({
  selector: 'app-closet-listar',
  templateUrl: './closet-listar.component.html',
  styleUrls: ['./closet-listar.component.css']
})
export class ClosetListarComponent implements OnInit{
  dataSource: MatTableDataSource<Closet> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'closet',
    'estilo',
    'usuario',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cS: ClosetService, private loginService: LoginService) {}
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
  role:string=""
  verificar() {
    this.role=this.loginService.showRole();
    return this.loginService.verificar();
  }
}
