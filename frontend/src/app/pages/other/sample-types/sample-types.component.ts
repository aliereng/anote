import { Component, OnInit } from '@angular/core';
import SampleType from 'src/app/models/SampleType';
import { SampleTypeService } from 'src/app/services/sample-type.service';
declare var alertify: any; // `alertify`'yi tanımlayın

@Component({
  selector: 'app-sample-types',
  templateUrl: './sample-types.component.html',
  styleUrls: ['./sample-types.component.css']
})
export class SampleTypesComponent implements OnInit {

  sampleTypes! : SampleType[]
  sampleTypeName ="";
  sampleType!: SampleType
  constructor(private _sampleTypesService: SampleTypeService) { }

  ngOnInit(): void {
    this._sampleTypesService.getSampleTypes().subscribe(result => {
      this.sampleTypes = result.data;
    })
  }
  addSampleType(){
    if(this.sampleTypeName !==""){
      const newSampleType = {
        name: this.sampleTypeName
      }
      this._sampleTypesService.addSampleType(newSampleType).subscribe(result => {
        this.sampleTypes.push(result.data)
      },error => {
        alertify.error(error.message)
      })
    }else{
      alertify.warning("Lüten analiz türü alanını boş bırakma.")
    }
  }
  deleteSampleType(sampleType:SampleType){
    const index = this.sampleTypes.indexOf(sampleType);
    this._sampleTypesService.deleteSampleTypeById(sampleType._id!).subscribe(result => {
      this.sampleTypes.splice(index,1)
      alertify.success("Numune Türü Silindi.")
    },error => {
      alertify.error(error.message)
    })
  }
  deleteAllSampleTypes(){
    this._sampleTypesService.deleteAllSampleTypes().subscribe(result => {
      if(result.success){
        alertify.success("Tümü silindi.")
        this.sampleTypes = []
      }
    },error => {
      alertify.error(error.message)
    })
  }
  selectSampleType(sampleType: SampleType){
    this.sampleTypeName = sampleType.name
    this.sampleType = sampleType
  }
  updateSampleType(){
    this.sampleType.name = this.sampleTypeName
    const index = this.sampleTypes.indexOf(this.sampleType);
    this._sampleTypesService.updateSampleType(this.sampleType).subscribe(result => {
      if(result.success){
        alertify.success("Güncelleme İşlemi Başarılı.")
        this.sampleTypes[index] = result.data
      }
    },error => {
      alertify.error(error.message)
    })

  }

}
