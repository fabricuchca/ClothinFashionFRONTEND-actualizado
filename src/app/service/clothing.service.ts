import { Observable,Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Clothing } from '../model/clothing';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ClothingService {
  private url=`${base_url}/clothings`
  private listaCambio=new Subject<Clothing[]>();
  constructor(private http:HttpClient) { }

  insert(tc:Clothing){
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url,tc, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  list(){
    let token = sessionStorage.getItem('token');
    return this.http.get<Clothing[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva:Clothing[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  delete(idClothing:number){
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${idClothing}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  listId(idClothing:number){
    let token = sessionStorage.getItem('token');
    return this.http.get<Clothing>(`${this.url}/${idClothing}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  //UPDATE Y BUSCAR
  update(tc:Clothing){
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url,tc, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

}
