import { Observable,Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Brand } from '../model/brand';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private url=`${base_url}/brands`
  private listaCambio=new Subject<Brand[]>()
  constructor(private http:HttpClient) { }
  //insert, list, delete, listid

  list(){
    let token=sessionStorage.getItem('token');
    return this.http.get<Brand[]>(this.url,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(br:Brand){
    let token= sessionStorage.getItem('token');
    return this.http.post(this.url,br,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva:Brand[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(idBrand:number){
    let token=sessionStorage.getItem('token');
    return this.http.get<Brand>(`${this.url}/${idBrand}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  delete(idBrand:number){
    let token=sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${idBrand}`,{
      headers:new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
      .set('Content-Type','application/json'),
    });
  }

  //UPDATE Y BUSCAR
  update(br:Brand){
    let token=sessionStorage.getItem('token');
    return this.http.put(this.url,br,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
