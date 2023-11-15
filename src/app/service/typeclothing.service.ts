import { Observable,Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TypeClothing } from '../model/typeclothing';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TypeclothingService {
  private url=`${base_url}/typeClothings`
  private listaCambio=new Subject<TypeClothing[]>();
  constructor(private http:HttpClient) { }

  insert(tc:TypeClothing){
    let token=sessionStorage.getItem('token');
    return this.http.post(this.url,tc,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  list(){
    let token=sessionStorage.getItem('token');
    return this.http.get<TypeClothing[]>(this.url,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva:TypeClothing[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  delete(idTypeClothing:number){
    let token=sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${idTypeClothing}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });

  }
  listId(idTypeClothing:number){
    let token=sessionStorage.getItem('token');
    return this.http.get<TypeClothing>(`${this.url}/${idTypeClothing}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  //UPDATE Y BUSCAR
  update(tc:TypeClothing){
    let token=sessionStorage.getItem('token');
    return this.http.put(this.url,tc,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
