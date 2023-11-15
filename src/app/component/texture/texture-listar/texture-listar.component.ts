import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Texture } from 'src/app/model/texture';
import { TextureService } from 'src/app/service/texture.service';

@Component({
  selector: 'app-texture-listar',
  templateUrl: './texture-listar.component.html',
  styleUrls: ['./texture-listar.component.css']
})
export class TextureListarComponent implements OnInit{
  dataSource: MatTableDataSource<Texture> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'textura',
    'materialh',
    'fecha',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cS: TextureService) {}
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
