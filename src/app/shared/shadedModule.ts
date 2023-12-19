import { NgModule } from '@angular/core';
import { HeaderComponent } from './shared-components/header/header.component';
import FooterComponent from './shared-components/footer/footer.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';



@NgModule({
declarations: [ 
    HeaderComponent,
    FooterComponent,
],
imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
],
exports: [
HeaderComponent,
FooterComponent,

]
})
export class sharedModule {} 

