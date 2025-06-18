import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Propuesta } from '../interface/propuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class PropuestaServiceService {

   private baseUrl = 'http://localhost:8080/propuesta';

  constructor(private http: HttpClient) { }

  getByListaId(idLista: number): Observable<Propuesta[]> {
    return this.http.get<Propuesta[]>(`${this.baseUrl}/lista/${idLista}`);
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
