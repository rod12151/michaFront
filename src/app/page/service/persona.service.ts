import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Persona} from "../interface/persona.interface";


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  baseUrl:string = "http://localhost:8080/api/persona"
  constructor(private http:HttpClient) { }

  getAll() :Observable<any>{
    let header = new HttpHeaders();
    let token = localStorage.getItem('token');
    header =header.set('Authorization', 'Bearer ' + token);
    return this.http.get(this.baseUrl+"",{headers:header})
  }

  save(persona:Persona):Observable<any>{
    let header = new HttpHeaders();
    let token = localStorage.getItem('token');
    header =header.set('Authorization', 'Bearer ' + token);

    header =header.set('Content-Type','application/json');
   return this.http.post(this.baseUrl+"", JSON.stringify(persona), {headers:header});
  }

  delete(id?: number):Observable<any>{
    let header = new HttpHeaders();
    let token = localStorage.getItem('token');
    header =header.set('Authorization', 'Bearer ' + token);
   return this.http.delete(this.baseUrl+"/" +id,{headers:header});
  }

  getPersona(id?: number):Observable<any>{
    let header = new HttpHeaders();
    let token = localStorage.getItem('token');
    header =header.set('Authorization', 'Bearer ' + token);
    return this.http.get(this.baseUrl+"/" +id,{headers:header});
  }
}
