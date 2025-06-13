import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ProcesoElectoral} from "../interface/procesoElectoral.interface";


@Injectable({
  providedIn: 'root'
})
export class ProcesoElectoralService {

  baseUrl:string = "http://localhost:8080/api/procesoElectoral"

  constructor(private http:HttpClient) {

   }

   getAll() :Observable<any>{

     console.log(this.baseUrl);
     let header = new HttpHeaders();
     let token = localStorage.getItem('token');
     header =header.set('Authorization', 'Bearer ' + token);
     console.log(this.baseUrl);
     return this.http.get(this.baseUrl+"",{headers:header})
   }

   save(procesoElectoral:ProcesoElectoral):Observable<any>{
     let header = new HttpHeaders();
     header =header.set('Content-Type','application/json');
     let token = localStorage.getItem('token');
     header =header.set('Authorization', 'Bearer ' + token);
    return this.http.post(this.baseUrl+"", JSON.stringify(procesoElectoral), {headers:header});
   }

   delete(id?: number):Observable<any>{
     let header = new HttpHeaders();
     let token = localStorage.getItem('token');
     header =header.set('Authorization', 'Bearer ' + token);
    return this.http.delete(this.baseUrl+"/" +id,{headers:header});
   }


}
