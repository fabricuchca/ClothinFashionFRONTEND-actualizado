import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Comments } from 'src/app/model/comments';
import { CommentsService } from 'src/app/service/comments.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-comments-listar',
  templateUrl: './comments-listar.component.html',
  styleUrls: ['./comments-listar.component.css']
})
export class CommentsListarComponent implements OnInit{
  dataSource: MatTableDataSource<Comments> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'titulo',
    'comentario',
    'puntaje',
    'prendas',
    'fecha',
    'autor',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cS: CommentsService, private loginService: LoginService) {}
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
