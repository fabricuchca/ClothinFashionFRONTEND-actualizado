import { Observable,Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Color } from '../model/color';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private url=`${base_url}/colors`
  private listaCambio=new Subject<Color[]>()
  constructor(private http:HttpClient) { }

  //insert , delete

  insert(co:Color){
    let token=sessionStorage.getItem('token');
    return this.http.post(this.url,co,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  delete(idColor:number){
    let token= sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${idColor}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  list(){
    let token=sessionStorage.getItem('token');
    return this.http.get<Color[]>(this.url,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva:Color[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(idColor:number){
    let token=sessionStorage.getItem('token');
    return this.http.get<Color>(`${this.url}/${idColor}`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }

  //UPDATE Y BUSCAR

  update(co:Color){
    let token=sessionStorage.getItem('token');
    return this.http.put(this.url,co,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
