import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Clothing } from 'src/app/model/clothing';
import { ClothingService } from 'src/app/service/clothing.service';

@Component({
  selector: 'app-clothing-listar',
  templateUrl: './clothing-listar.component.html',
  styleUrls: ['./clothing-listar.component.css']
})
export class ClothingListarComponent implements OnInit{
  dataSource:MatTableDataSource<Clothing>= new MatTableDataSource();
  displayedColumns:string[]=['idPrenda','temporada','textura', 'color', 'evento', 'catalogo','tienda', 'closet', 'marca', 'tipoprenda'];
  @ViewChild(MatPaginator)paginator!:MatPaginator;
  constructor(private tcS:ClothingService){}
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
}
