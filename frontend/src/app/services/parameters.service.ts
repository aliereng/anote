import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Parameter from '../models/Parameter';
@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  constructor(private _http: HttpClient) { }
  getParameters(): Observable<{ success:boolean, data: Parameter[]}>{
    return this._http.get<{ success:boolean, data: Parameter[]}>(`${environment.apiUrl}/parameters`)
  }
  deleteParameterByID(parameterID: string): Observable<{success: boolean}>{
    return this._http.delete<{success: boolean}>(`${environment.apiUrl}/parameters/${parameterID}`)
  }
  addParamter(parameter:Parameter): Observable<{success: boolean, data: Parameter}>{
    return this._http.post<{success:boolean, data:Parameter}>(`${environment.apiUrl}/parameters`, parameter)
  }
  filterParameterByAnalysisType(analysisTypeId: string):Observable<{success: boolean, data: Parameter[]}>{
    return this._http.get<{success:boolean, data: Parameter[]}>(`${environment.apiUrl}/parameters/filter/analysis-type/${analysisTypeId}`)
  }
  filterParameterByParameterName(parameterName: string):Observable<{success: boolean, data: Parameter}>{
    return this._http.get<{success:boolean, data: Parameter}>(`${environment.apiUrl}/parameters/filter/parameter-name/${parameterName}`)
  }
  deleteAllParameters(): Observable<{success:boolean}>{
    return this._http.get<{success:boolean}>(`${environment.apiUrl}/parameters/delete/all`)
  }
}
