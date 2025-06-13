import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Socio} from "../interface/socio.interface";


@Injectable({
  providedIn: 'root'
})
export class SocioService {

  baseUrl:string = "http://localhost:8080/api/socio"
  constructor(private http:HttpClient) { }

  getAll() :Observable<any>{
    let header = new HttpHeaders();

    let token = localStorage.getItem('token');
    header =header.set('Authorization', 'Bearer ' + token);
    return this.http.get(this.baseUrl+"",{headers:header})
  }

  save(socio:Socio):Observable<any>{
    let header = new HttpHeaders();
    header =header.set('Content-Type','application/json');
    let token = localStorage.getItem('token');
    header =header.set('Authorization', 'Bearer ' + token);
   return this.http.post(this.baseUrl+"", JSON.stringify(socio), {headers:header});
  }

  delete(id?: number):Observable<any>{
    let header = new HttpHeaders();

    let token = localStorage.getItem('token');
    header =header.set('Authorization', 'Bearer ' + token);
   return this.http.delete(this.baseUrl+"/" +id,{headers:header});
  }

  getSocio(id?: number):Observable<any>{
    let header = new HttpHeaders();
    let token = localStorage.getItem('token');
    header =header.set('Authorization', 'Bearer ' + token);
    return this.http.get(this.baseUrl+"/" +id,{headers:header});
   }
}
