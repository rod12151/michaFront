import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Lista} from "../interface/lista.interface";
import {Candidato} from "../interface/candidato.interface";

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  baseUrl:string = "http://localhost:8080/api/candidato";
  constructor(private http:HttpClient) { }

  getAllbyLista(id?:number) :Observable<any>{
    let header = new HttpHeaders();
    let token = localStorage.getItem('token');
    header =header.set('Authorization', 'Bearer ' + token);
    return this.http.get(this.baseUrl+"/lista/"+id,{headers:header});
  }

  delete(id?: number):Observable<any>{
    let header = new HttpHeaders();
    let token = localStorage.getItem('token');
    header =header.set('Authorization', 'Bearer ' + token);
    return this.http.delete(this.baseUrl+"/" +id,{headers:header});
  }

  save(candidato:Candidato,id? :number):Observable<any>{
    let header = new HttpHeaders();
    let token = localStorage.getItem('token');
    header =header.set('Authorization', 'Bearer ' + token);

    console.log("ca " +candidato)
    header =header.set('Content-Type','application/json');
    return this.http.post(this.baseUrl+"/" + id, JSON.stringify(candidato), {headers:header});
  }
}
