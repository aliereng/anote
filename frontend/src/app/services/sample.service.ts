import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Sample from '../models/Sample';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SampleService {

  constructor(private http: HttpClient) { }

  createSample(sample:Object):Observable<{success: boolean, data:Sample}>{
    return this.http.post<{success: boolean, data:Sample}>("http://localhost:3000/api/samples",   sample)
  }
}
