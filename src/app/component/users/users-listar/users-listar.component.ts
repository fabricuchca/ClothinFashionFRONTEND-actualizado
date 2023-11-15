import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from 'src/app/model/users';
import { LoginService } from 'src/app/service/login.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-users-listar',
  templateUrl: './users-listar.component.html',
  styleUrls: ['./users-listar.component.css']
})
export class UsersListarComponent implements OnInit{
  lista: Users[]=[]
  dataSource: MatTableDataSource<Users> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'apellido',
    'direccion',
    'telefono',
    'correo',
    'fecha',
    'nombreusuario',
    'habilitado',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cS: UsersService) {}
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
