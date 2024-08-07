import { Component, OnInit } from '@angular/core';
import Parameter from 'src/app/models/Parameter';
import Sample from 'src/app/models/Sample';
import { SampleService } from 'src/app/services/sample.service';
declare var alertify: any;
@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.css']
})
export class SamplesComponent implements OnInit {
  samples!: Sample[]
  sampleParameters!: Parameter[];
  updatedParameters!: Parameter[];
  constructor(private _sampleService: SampleService) { }

  ngOnInit(): void {
    this._sampleService.getAllSamples().subscribe(result => {
      this.samples = result.data;
    })
  }
  listSampleParameters(sample:Sample){
    this.sampleParameters = sample.parameters
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
  changeSelect(parameter:Parameter){
    if(this.sampleParameters.includes(parameter)){
      const index = this.sampleParameters.indexOf(parameter);
      // this.
    }

  }

}
