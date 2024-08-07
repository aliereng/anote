import { Component, OnInit } from '@angular/core';
import AnalysisType from 'src/app/models/AnalysisType';

import Parameter from 'src/app/models/Parameter';
import { AnalysisTypeService } from 'src/app/services/analysis-type.service';
import { ParameterService } from 'src/app/services/parameters.service';
declare var alertify: any; // `alertify`'yi tanımlayın


@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {
  parameters! : Parameter[]
  analysisTypes! : AnalysisType[]
  parameterName!: string;
  selectedAnalysisType: string = "0";
  constructor(private parameterService: ParameterService, private analysisTypeService: AnalysisTypeService) { }

  ngOnInit(): void {
    this.parameterService.getParameters().subscribe(result => {
      this.parameters = result.data;
    })
    this.analysisTypeService.getParameters().subscribe(result => {
      this.analysisTypes = result.data
    })
  }

  deleteParameter(_id: string){
    this.parameterService.deleteParameterByID(_id).subscribe(result => {
      if(result.success){
        let index;
        this.parameters.forEach(parameter => {
          if(parameter._id === _id){
            index = this.parameters.indexOf(parameter)
            this.parameters.splice(index,1)

          }
        })
        alertify.success("parametre silme işlemi başarılı")
      }
    },error => {
      alertify.error("parametre silme işlemi hatalarla karşılaştı: ", error)
    })
  }
  addParameter(){
    const newParameter = {
      name: this.parameterName,
      analysisType: this.selectedAnalysisType
    }
    this.parameterService.addParamter(newParameter).subscribe(result => {
      if(result.success){
        alertify.success(`${this.parameterName} eklendi.`)
        this.parameters.push(result.data)
        this.parameterName = ""
        this.selectedAnalysisType = "0"

      }
    },error=> {
      alertify.error(error)
    })
  }
  // findParameter(){
  //   if(this.parameterName === undefined && this.selectedAnalysisType ==="0"){
  //     alertify.error("lütfen aramak istediğiniz parametre adını ya da filtrelemek istediğiniz analiz tipini seçin.")

  //   }else{
  //     if(this.parameterName !== undefined){
  //       let index!:number;
  //       this.parameters.forEach((parameter,i) => {
  //         parameter.name === this.parameterName.trim().toLowerCase()? (index = i):(index =-1)
  //       })
  //       if(index === -1){
  //         alertify.warning("aradığınız parametre bulunamadı")
  //       }else{
  //         const parameterItems = document.getElementsByClassName("parameter-items");
  //         if(Array.isArray(parameterItems)){
  //           parameterItems[index].setAttribute("style", "color:red")
  //         }
  //       }
  //     }else{

  //     }
  //   }
  // }
  deleteAllParameters(){
    this.parameterService.deleteAllParameters().subscribe(result => {
      if(result.success){
        this.parameters = [];
        alertify.success("Tüm parametreler silindi.")
      }
    },error => {
      alertify.error(error.message)
    });
    
  }
}
