import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import AnalysisType from '../models/AnalysisType';
@Injectable({
  providedIn: 'root'
})
export class AnalysisTypeService {

  constructor(private http: HttpClient) { }
  
  getParameters():Observable<{success: true, data: AnalysisType[]}>{
    return this.http.get<{success: true, data: AnalysisType[]}>("http://localhost:3000/api/analysis-types")
  }
}
