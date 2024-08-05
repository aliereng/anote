import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private http: HttpClient) { }

  // getPdf():Observable<Blob>{
  //   return this.http.get<Blob>("http://localhost:3000/api/pdf/su")
  // }
  createPdf(sampleTypeName: string): Observable<{success: boolean, message: string}>{
    return this.http.get<{success: boolean, message: string}>(`http://localhost:3000/api/pdf/create/${sampleTypeName}`)
  }
}
