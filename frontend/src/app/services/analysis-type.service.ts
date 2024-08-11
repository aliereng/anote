import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import AnalysisType from '../models/AnalysisType';
@Injectable({
  providedIn: 'root'
})
export class AnalysisTypeService {

  constructor(private http: HttpClient) { }
  
  getAnalysisTypes():Observable<{success: boolean, data: AnalysisType[]}>{
    return this.http.get<{success: boolean, data: AnalysisType[]}>(`${environment.apiUrl}/analysis-types`)
  }
  addAnalysisType(analysisType: AnalysisType):Observable<{success: boolean, data: AnalysisType}>{
    return this.http.post<{success: boolean, data: AnalysisType}>(`${environment.apiUrl}/analysis-types`,analysisType)
  }
  deleteAnalysisTypeById(analysisTypeId: string): Observable<{success:boolean}>{
    return this.http.delete<{success: boolean}>(`${environment.apiUrl}/analysis-types/delete/${analysisTypeId}`)
  }
  deleteAllAnalysisTypes():Observable<{success: boolean}>{
    return this.http.delete<{success: boolean}>(`${environment.apiUrl}/analysis-types/delete/all`)
  }
  updateAnalysisType(analysisType: AnalysisType): Observable<{success: boolean, data:AnalysisType}>{
    return this.http.put<{success: boolean, data: AnalysisType}>(`${environment.apiUrl}/analysis-types/update`, analysisType)
  }
}
