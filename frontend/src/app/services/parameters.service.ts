import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, ObservedValueOf } from 'rxjs';
import Parameter from '../models/Parameter';
@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  constructor(private _http: HttpClient) { }
  getParameters(): Observable<{ success:boolean, data: Parameter[]}>{
    return this._http.get<{ success:boolean, data: Parameter[]}>("http://localhost:3000/api/parameters")
  }
  deleteParameterByID(parameterID: string): Observable<{success: boolean}>{
    return this._http.delete<{success: boolean}>(`http://localhost:3000/api/parameters/${parameterID}`)
  }
  addParamter(parameter:Parameter): Observable<{success: boolean, data: Parameter}>{
    return this._http.post<{success:boolean, data:Parameter}>("http://localhost:3000/api/parameters", parameter)
  }
  filterParameterByAnalysisType(analysisTypeId: string):Observable<{success: boolean, data: Parameter[]}>{
    return this._http.get<{success:boolean, data: Parameter[]}>(`http://localhost:3000/api/parameters/filter/analysis-type/${analysisTypeId}`)
  }
  filterParameterByParameterName(parameterName: string):Observable<{success: boolean, data: Parameter}>{
    return this._http.get<{success:boolean, data: Parameter}>(`http://localhost:3000/api/parameters/filter/parameter-name/${parameterName}`)
  }
}
