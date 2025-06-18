import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Propuesta } from '../interface/propuesta.interface';
import { ProcesoElectoral } from '../interface/procesoElectoral.interface';

@Injectable({
  providedIn: 'root'
})
export class PublicServiceService {

  private baseUrl = 'http://localhost:8080/public';
  
    constructor(private http: HttpClient) { }

    listaProcesos():Observable<ProcesoElectoral[]>{
      return this.http.get<ProcesoElectoral[]>(`${this.baseUrl}/procesos`);
    }
    
    ProcesoPorId(id: number):Observable<ProcesoElectoral>{
      return this.http.get<ProcesoElectoral>(`${this.baseUrl}/procesos/${id}`);
    }
  
    getByListaId(idLista: number): Observable<Propuesta[]> {
      return this.http.get<Propuesta[]>(`${this.baseUrl}/procesos`);
    }
  
    save(idLista: number, propuesta: Propuesta): Observable<Propuesta> {
      return this.http.post<Propuesta>(`${this.baseUrl}/crear/${idLista}`, propuesta);
    }
  
    editar(idPropuesta: number,propuesta:Propuesta):Observable<Propuesta>{
      return this.http.put<Propuesta>(`${this.baseUrl}/actualizar/${idPropuesta}`,propuesta);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
    }
}
