import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { OtherComponent } from './pages/other/other.component';
import { ParametersComponent } from './pages/other/parameters/parameters.component';
import { ContentsComponent } from './pages/other/contents/contents.component';
import { SampleTypesComponent } from './pages/other/sample-types/sample-types.component';
import { AnalysisTypesComponent } from './pages/other/analysis-types/analysis-types.component';
import { SamplesComponent } from './pages/other/samples/samples.component';

const routes: Routes = [
  {path: "", component:HomepageComponent},
  {path: "other", component: OtherComponent, children:[
    {path:"parameters", component: ParametersComponent},
    {path:"contents", component: ContentsComponent},
    {path:"sample-types", component: SampleTypesComponent},
    {path:"analysis-types", component: AnalysisTypesComponent},
    {path:"samples", component: SamplesComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
