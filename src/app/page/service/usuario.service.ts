import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Usuario} from "../interface/usuario.interface";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl:string = "http://localhost:8080/api/auth"
  constructor(private http:HttpClient) { }


  getAll() :Observable<Usuario[]>{

    console.log(this.baseUrl);
    let header = new HttpHeaders();
    let token = localStorage.getItem('token');
    header =header.set('Authorization', 'Bearer ' + token);
    console.log(this.baseUrl);
    return this.http.get<Usuario[]>(this.baseUrl+"/listar",{headers:header})
  }

  crear(usuario:Usuario):Observable<Usuario>{
    console.log(this.baseUrl);
    let header = new HttpHeaders();
    let token = localStorage.getItem('token');
    header =header.set('Content-Type','application/json');
    header =header.set('Authorization', 'Bearer ' + token);
    console.log(usuario);
    return this.http.post<Usuario>(this.baseUrl+"/registro",JSON.stringify(usuario),{headers:header})
  }
}
