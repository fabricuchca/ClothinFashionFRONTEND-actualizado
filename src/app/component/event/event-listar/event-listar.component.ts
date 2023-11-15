import { Event } from './../../../model/event';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from 'src/app/service/event.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-event-listar',
  templateUrl: './event-listar.component.html',
  styleUrls: ['./event-listar.component.css']
})
export class EventListarComponent implements OnInit{
  dataSource:MatTableDataSource<Event>=new MatTableDataSource();
  displayedColumns:string[]=['idEvento','tema','descripcionEvento','accion01','accion02'];
  @ViewChild(MatPaginator)paginator!:MatPaginator;
  constructor(private eS:EventService,private loginService:LoginService){}
  ngOnInit(): void {
    this.eS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
    });
    this.eS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
    });
  }
  eliminar(id:number){
    this.eS.delete(id).subscribe((data)=>{
      this.eS.list().subscribe((data)=>{
        this.eS.setList(data);
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
