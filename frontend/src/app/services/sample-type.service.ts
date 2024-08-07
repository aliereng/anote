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

  getsampleTypes():Observable<{success: true, data: SampleType[]}>{
    return this._http.get<{success: true, data: SampleType[]}>(`${environment.apiUrl}/sample-types`)
  }
}
