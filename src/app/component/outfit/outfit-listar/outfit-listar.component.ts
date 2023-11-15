import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Outfit } from 'src/app/model/outfit';
import { LoginService } from 'src/app/service/login.service';
import { OutfitService } from 'src/app/service/outfit.service';

@Component({
  selector: 'app-outfit-listar',
  templateUrl: './outfit-listar.component.html',
  styleUrls: ['./outfit-listar.component.css']
})
export class OutfitListarComponent implements OnInit{
  dataSource: MatTableDataSource<Outfit> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'outfit',
    'estilo',
    'ropas',
    'fecha',
    'catalogo',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cS: OutfitService, private loginService: LoginService) {}
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
  role:string="";
  verificar(){
    this.role=this.loginService.showRole();
    return this.loginService.verificar();
  }
}
