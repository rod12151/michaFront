import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Propuesta } from '../interface/propuesta.interface';
import { ProcesoElectoral } from '../interface/procesoElectoral.interface';
import { Lista } from '../interface/lista.interface';

@Injectable({
  providedIn: 'root'
})
export class PublicServiceService {

  private baseUrl = 'http://localhost:8080/public';
  
    constructor(private http: HttpClient) { }

    listaProcesos():Observable<ProcesoElectoral[]>{
      return this.http.get<ProcesoElectoral[]>(`${this.baseUrl}/procesos`);
    }
    ListaPorIdProceso(idProceso:number):Observable<Lista[]>{
      return this.http.get<Lista[]>(`${this.baseUrl}/listas/${idProceso}`)
    }
    /*/lista/{idLista}*/
    lista(idLista:number):Observable<Lista>{
      return this.http.get<Lista>(`${this.baseUrl}/lista/${idLista}`)
    }
   
}
