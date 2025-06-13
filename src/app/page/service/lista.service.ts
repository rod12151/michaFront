import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Lista} from "../interface/lista.interface";

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  baseUrl:string = "http://localhost:8080/api/lista"
  constructor(private http:HttpClient) { }

  getAll() :Observable<any>{
    let header = new HttpHeaders();
    let token = localStorage.getItem('token');
    header =header.set('Authorization', 'Bearer ' + token);
    return this.http.get(this.baseUrl+"",{headers:header})
  }

  save(lista:Lista):Observable<any>{
    let header = new HttpHeaders();
    let token = localStorage.getItem('token');
    header =header.set('Authorization', 'Bearer ' + token);

    header =header.set('Content-Type','application/json');
   return this.http.post(this.baseUrl+"", JSON.stringify(lista), {headers:header});
  }

  delete(id?: number):Observable<any>{
    let header = new HttpHeaders();
    let token = localStorage.getItem('token');
    header =header.set('Authorization', 'Bearer ' + token);
   return this.http.delete(this.baseUrl+"/" +id,{headers:header});
  }
  getbyid(id?:number):Observable<any>{
    let header = new HttpHeaders();
    let token = localStorage.getItem('token');
    header =header.set('Authorization', 'Bearer ' + token);
    return this.http.get(this.baseUrl+"/"+id,{headers:header});
  }
}
