import { Event } from './../model/event';
import { Subject,Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private url=`${base_url}/events`
  private listaCambio=new Subject<Event[]>()
  constructor(private http:HttpClient) { }

  insert(ev:Event){
    let token=sessionStorage.getItem('token');
    return this.http.post(this.url,ev,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  delete(idEvent:number){
    let token=sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${idEvent}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  list(){
    let token=sessionStorage.getItem('token');
    return this.http.get<Event[]>(this.url,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva:Event[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(idEvent:number){
    let token=sessionStorage.getItem('token');
    return this.http.get<Event>(`${this.url}/${idEvent}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  //UPDATE Y BUSCAR
  update(ev:Event){
    let token=sessionStorage.getItem('token');
    return this.http.put(this.url,ev,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
