import { Component, OnInit } from '@angular/core';
import Parameter from 'src/app/models/Parameter';
import SampleType from 'src/app/models/SampleType';
import { ParameterService } from 'src/app/services/parameters.service';
import { PdfService } from 'src/app/services/pdf.service';
import { SampleTypeService } from 'src/app/services/sample-type.service';
import { SampleService } from 'src/app/services/sample.service';
declare var alertify: any; // `alertify`'yi tanımlayın

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  parameters!: Parameter[];
  sampleTypes!: SampleType[];
  selectedParameters: string[] = [];
  sampleCode!: string;
  selectedSampleType: string = "0";
  sampleAcceptDate!: string | undefined
  downloadStatus:boolean = false;
  constructor(
    private parameterService: ParameterService, 
    private sampleTypeService: SampleTypeService,
    private sampleService: SampleService,
    private pdfService: PdfService) {}

  ngOnInit(): void {
    this.parameterService.getParameters().subscribe(result => {
        this.parameters = result.data
    })
    this.sampleTypeService.getSampleTypes().subscribe(result => {
      this.sampleTypes = result.data
    })
  }
  selectParameter(parameterID:string){
    if(this.selectedParameters.includes(parameterID)){
      const index = this.selectedParameters.indexOf(parameterID);
      this.selectedParameters.splice(index,1)
    }else{
      this.selectedParameters.push(parameterID)
    }
  }

  addSample(){
    const [year, month, day] = this.sampleAcceptDate!.split("-");
    const newSample = {
      name: this.sampleCode.trim().toUpperCase(),
      sampleType: this.selectedSampleType,
      acceptDate: new Date(parseInt(year), parseInt(month)-1, parseInt(day)),
      parameters: this.selectedParameters
    }
    this.sampleService.createSample(newSample).subscribe(result => {
      if(result.success){
        alertify.success(`${result.data.name} eklendi.`)
      }
    },error => {
      alertify.error("Numune Ekelenemedi!." + " " + error)
    }
    )
  }

  createPdf(){
    let sampleTypeName = this.getSampleTypeName();
    this.pdfService.createPdf(sampleTypeName).subscribe(result => {
      if(result.success){
        this.downloadStatus = true;
        alertify.success("pdf başarı ile oluşturuldu.")
        this.clearChoices();
        this.clearInputs();
      }
    })
  }
  showPdf(){
    let sampleTypeName = this.getSampleTypeName()
    if(!sampleTypeName){
      alertify.error("lütfen numune türünü seçiniz.")
    }else{
      window.open(`http://localhost:3000/api/pdf/${sampleTypeName}`,"_blank");
      window.location.reload()
  
    }
   
  }

  getSampleTypeName() {
    let sampleTypeName!: string;
    this.sampleTypes.forEach(sampleType => {
      if(sampleType._id === this.selectedSampleType){
        sampleTypeName = sampleType.name
      }
    })
    return sampleTypeName;
  }
  clearInputs(){
    this.sampleCode = "";
    this.selectedSampleType = "0";
    this.sampleAcceptDate = undefined;
  }
  clearChoices(){
    const choiceItems = document.getElementsByClassName("choice-item") 
    for(let i = 0; i<choiceItems.length; i++){
      const inputElement = choiceItems[i] as HTMLInputElement;
      inputElement.checked = false
    }
  }
}
