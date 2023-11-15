import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TypeClothing } from 'src/app/model/typeclothing';
import { LoginService } from 'src/app/service/login.service';
import { TypeclothingService } from 'src/app/service/typeclothing.service';

@Component({
  selector: 'app-typeclothing-listar',
  templateUrl: './typeclothing-listar.component.html',
  styleUrls: ['./typeclothing-listar.component.css']
})
export class TypeclothingListarComponent {
  dataSource:MatTableDataSource<TypeClothing>=new MatTableDataSource();
  displayedColumns:string[]=['idTipoPrenda','nombre','talla','genero','descripcion','categoria','ocasion','accion01','accion02'];
  @ViewChild(MatPaginator)paginator!:MatPaginator;
  constructor(private tcS:TypeclothingService, private loginService:LoginService){}
  ngOnInit(): void {
    this.tcS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
    });
    this.tcS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
    })
  }
  eliminar(id:number){
    this.tcS.delete(id).subscribe((data)=>{
      this.tcS.list().subscribe((data)=>{
        this.tcS.setList(data);
      });
    });
  }
  filter(en:any){
    this.dataSource.filter=en.target.value.trim();
  }
  role:string="";
  verificar(){
    this.role=this.loginService.showRole();
    return this.loginService.verificar();
  }
}
