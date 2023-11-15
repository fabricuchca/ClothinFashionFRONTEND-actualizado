import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Users } from '../model/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersClaseDTO } from '../model/UsersClaseDTO';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = `${base_url}/users`
  private listaCambio = new Subject<Users[]>()

  constructor(private http: HttpClient) { }

  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Users[]>(this.url,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(cl: Users) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, cl,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva: Users[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Users>(`${this.url}/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(c: Users) { //http HttpClientModule: get-post-put-delete, hacer cuadro comparativo
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, c,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }


  delete(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  getCountClosetByUser(): Observable<UsersClaseDTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<UsersClaseDTO[]>(`${this.url}/armarios`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
