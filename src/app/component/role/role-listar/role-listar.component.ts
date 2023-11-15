import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from 'src/app/model/role';
import { LoginService } from 'src/app/service/login.service';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-role-listar',
  templateUrl: './role-listar.component.html',
  styleUrls: ['./role-listar.component.css']
})
export class RoleListarComponent {
  dataSource: MatTableDataSource<Role> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'rol',
    'usuario',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cS: RoleService, private loginService: LoginService) {}
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
