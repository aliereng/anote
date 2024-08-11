import { Component, OnInit } from '@angular/core';
import AnalysisType from 'src/app/models/AnalysisType';
import { AnalysisTypeService } from 'src/app/services/analysis-type.service';
declare var alertify: any; // `alertify`'yi tanımlayın

@Component({
  selector: 'app-analysis-types',
  templateUrl: './analysis-types.component.html',
  styleUrls: ['./analysis-types.component.css']
})
export class AnalysisTypesComponent implements OnInit {

  analysisTypes! : AnalysisType[]
  analysisTypeName ="";
  analysisType!: AnalysisType
  constructor(private _analysisTypeService: AnalysisTypeService) { }

  ngOnInit(): void {
    this._analysisTypeService.getAnalysisTypes().subscribe(result => {
      this.analysisTypes = result.data;
    })
  }
  addAnalysisType(){
    if(this.analysisTypeName !==""){
      const newAnalysisType = {
        name: this.analysisTypeName
      }
      this._analysisTypeService.addAnalysisType(newAnalysisType).subscribe(result => {
        this.analysisTypes.push(result.data)
      },error => {
        alertify.error(error.message)
      })
    }else{
      alertify.warning("Lüten analiz türü alanını boş bırakma.")
    }
  }
  deleteAnalysisType(analysisType:AnalysisType){
    const index = this.analysisTypes.indexOf(analysisType);
    this._analysisTypeService.deleteAnalysisTypeById(analysisType._id!).subscribe(result => {
      this.analysisTypes.splice(index,1)
      alertify.success("Analiz Tipi Silindi.")
    },error => {
      alertify.error(error.message)
    })
  }
  deleteAllAnalysisType(){
    this._analysisTypeService.deleteAllAnalysisTypes().subscribe(result => {
      if(result.success){
        alertify.success("Tümü silindi.")
        this.analysisTypes = []
      }
    },error => {
      alertify.error(error.message)
    })
  }
  selectAnalysisType(analysisType: AnalysisType){
    this.analysisTypeName = analysisType.name
    this.analysisType = analysisType
  }
  updateAnalysisType(){
    this.analysisType.name = this.analysisTypeName
    const index = this.analysisTypes.indexOf(this.analysisType);
    this._analysisTypeService.updateAnalysisType(this.analysisType).subscribe(result => {
      if(result.success){
        alertify.success("Güncelleme İşlemi Başarılı.")
        this.analysisTypes[index] = result.data
      }
    },error => {
      alertify.error(error.message)
    })

  }

}
