import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { OtherComponent } from './pages/other/other.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OtherNavComponent } from './components/other-nav/other-nav.component';
import { ParametersComponent } from './pages/other/parameters/parameters.component';
import { SamplesComponent } from './pages/other/samples/samples.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { AnalysisTypesComponent } from './pages/other/analysis-types/analysis-types.component';
import { SampleTypesComponent } from './pages/other/sample-types/sample-types.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    FooterComponent,
    OtherComponent,
    OtherNavComponent,
    ParametersComponent,
    SamplesComponent,
    CustomDatePipe,
    AnalysisTypesComponent,
    SampleTypesComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
