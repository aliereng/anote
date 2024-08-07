import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private http: HttpClient) { }

  // getPdf():Observable<Blob>{
  //   return this.http.get<Blob>("${environment.apiUrl}/pdf/su")
  // }
  createPdf(sampleTypeName: string): Observable<{success: boolean, message: string}>{
    return this.http.get<{success: boolean, message: string}>(`${environment.apiUrl}/pdf/create/${sampleTypeName}`)
  }
}
