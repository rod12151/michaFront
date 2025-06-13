import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class FileUploadModel {   data: File | undefined;   type: string | undefined; }

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  baseUrl:string = "http://localhost:8080/ap"

  constructor(private http: HttpClient) { }

  subirArchivo(form: FormData) {

    return this.http.post(`${this.baseUrl}/assets/upload`, form);
  }

}
