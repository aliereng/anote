import { Component, OnInit } from '@angular/core';
import Parameter from 'src/app/models/Parameter';
import Sample from 'src/app/models/Sample';
import SampleType from 'src/app/models/SampleType';
import { ParameterService } from 'src/app/services/parameters.service';
import { SampleTypeService } from 'src/app/services/sample-type.service';
import { SampleService } from 'src/app/services/sample.service';
declare var alertify: any;
@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.css']
})
export class SamplesComponent implements OnInit {
  samples!: Sample[]
  parameters!: Parameter[]
  sampleTypes!: SampleType[]
  sampleParameters!: Parameter[];
  selectedSampleType = "0";
  sample!: Sample;
  sampleName!: string;
  sampleAcceptDate!: string
  constructor(private _sampleService: SampleService, private _parameterService: ParameterService, private _sampleTypeService: SampleTypeService) { }

  ngOnInit(): void {
    this._sampleService.getAllSamples().subscribe(result => {
      this.samples = result.data;
    })
    this._parameterService.getParameters().subscribe(result => {
      this.parameters = result.data
    })
    this._sampleTypeService.getSampleTypes().subscribe(result => {
      this.sampleTypes = result.data
    })
  }
  listSampleParameters(sample:Sample){
    this.sampleName = sample.name
    this.sampleParameters = sample.parameters
    this.sample = sample
    console.log(sample)
  }

  deleteAllSamples(){
    this._sampleService.deleteAllSamples().subscribe(result => {
      if(result.success){
        this.samples= [];
        alertify.success("silme işlemi başarılı")
      }
    }, error => {
      alertify.error(error.message)
    })
  }
  changeSelect(parameter:Parameter, type:string){
   if(type === "samples"){
      if(this.sampleParameters.includes(parameter)){
        console.log("true")

        const index = this.sampleParameters.indexOf(parameter);
        this.sampleParameters.splice(index,1)
      }else{
        this.sampleParameters.push(parameter)
      }
   }else{
      if(this.sampleParameters.includes(parameter)){
        alertify.warning(`${parameter.name} zaten mevcut.`)
      }else{
        this.sampleParameters.push(parameter)
      }
   }
  }
  updateSample(){
    if(this.sampleAcceptDate){
      const [year, month, day] = this.sampleAcceptDate.split("-")
      this.sample.acceptDate = new Date(parseInt(year), parseInt(month)-1, parseInt(day))
    }
    this.sample.name = this.sampleName
    this._sampleService.updateSample(this.sample).subscribe(result => {
      if(result.success){
        alertify.success("Güncelleme işlemi Başarılı")
        for(let i = 0; i < this.samples.length; i++){
          if(this.samples[i]._id === result.data._id){
            this.samples[i] = result.data
          }
        }
      }
    })
  }
  filterSamplesBySampleType(){
    this.sampleName = ""
    this.sampleParameters = []
    if(this.selectedSampleType === "0"){
      this._sampleService.getAllSamples().subscribe(result=> {
        this.samples = result.data
      })
    }else{
      this._sampleService.getSamplesBySampleType(this.selectedSampleType).subscribe(result => {
        this.samples = result.data
      })
    }
  }
  getSampleBySampleName(){
    if(this.sampleName){
      const name = {
        name: this.sampleName.toUpperCase()
      }
      this._sampleService.getSampleBySampleName(name).subscribe(result => {
        this.samples = [result.data]
      },error => {
        alertify.error(error.message)
      })
    }else{
      alertify.warning("lütfen Aramak İstediğiniz Numune Kodunu Girin.")
    }
  }

}
