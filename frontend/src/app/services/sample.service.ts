import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Sample from '../models/Sample';
import { Observable, sample } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  constructor(private http: HttpClient) { }

  createSample(sample:Object):Observable<{success: boolean, data:Sample}>{
    return this.http.post<{success: boolean, data:Sample}>(`${environment.apiUrl}/samples`,   sample)
  }
  getAllSamples():Observable<{success:boolean, data:Sample[]}>{
    return this.http.get<{success: boolean, data: Sample[]}>(`${environment.apiUrl}/samples`)
  }
  deleteAllSamples(): Observable<{success: boolean}>{
    return this.http.delete<{success:boolean}>(`${environment.apiUrl}/samples/all`)
  }
  updateSample(sample: Sample): Observable<{success: boolean, data: Sample}>{
    return this.http.put<{success: boolean, data: Sample}>(`${environment.apiUrl}/samples/update/${sample._id}`, sample)
  }
  getSamplesBySampleType(sampleTypeId: string): Observable<{success: boolean, data: Sample[]}>{
    return this.http.get<{success: boolean, data: Sample[]}>(`${environment.apiUrl}/samples/sample-type/${sampleTypeId}`)
  }
  getSampleBySampleName(name: {}): Observable<{success: boolean, data:Sample}>{
    return this.http.post<{success: boolean, data:Sample}>(`${environment.apiUrl}/samples/name/`, name)
  }
}
