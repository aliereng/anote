import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import SampleType from '../models/SampleType';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SampleTypeService {

  constructor(private _http: HttpClient) { }

  getSampleTypes():Observable<{success: true, data: SampleType[]}>{
    return this._http.get<{success: true, data: SampleType[]}>(`${environment.apiUrl}/sample-types`)
  }
  addSampleType(sampleType: SampleType):Observable<{success: boolean, data: SampleType}>{
    return this._http.post<{success: boolean, data: SampleType}>(`${environment.apiUrl}/sample-types`,sampleType)
  }
  deleteSampleTypeById(sampleTypeId: string): Observable<{success:boolean}>{
    return this._http.delete<{success: boolean}>(`${environment.apiUrl}/sample-types/delete/${sampleTypeId}`)
  }
  deleteAllSampleTypes():Observable<{success: boolean}>{
    return this._http.delete<{success: boolean}>(`${environment.apiUrl}/sample-types/delete/all`)
  }
  updateSampleType(sampleType: SampleType): Observable<{success: boolean, data:SampleType}>{
    return this._http.put<{success: boolean, data: SampleType}>(`${environment.apiUrl}/sample-types/update`, sampleType)
  }
}
