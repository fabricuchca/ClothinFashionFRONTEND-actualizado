import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Color } from 'src/app/model/color';
import { ColorService } from 'src/app/service/color.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-color-listar',
  templateUrl: './color-listar.component.html',
  styleUrls: ['./color-listar.component.css']
})
export class ColorListarComponent {
  dataSource:MatTableDataSource<Color>=new MatTableDataSource();
  displayedColumns:string[]=['idColor','nombreColor','descripcion','tipoColor','accion2','accion'];
  @ViewChild(MatPaginator)paginator!:MatPaginator;
  constructor(private cS:ColorService,private loginService:LoginService){}
  ngOnInit(): void {
    this.cS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
    });
    this.cS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
    });
  }
  eliminar(idColor:number){
    this.cS.delete(idColor).subscribe((data)=>{
      this.cS.list().subscribe((data)=>{
        this.cS.setList(data);
      });
    });
  }
  filter(co:any){
    this.dataSource.filter=co.target.value.trim();
  }
  role:string="";
  verificar(){
    this.role=this.loginService.showRole();
    return this.loginService.verificar();
  }
}
