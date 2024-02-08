import { NgModule } from '@angular/core';
import { HeaderComponent } from './shared-components/header/header.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SideNavComponent } from './shared-components/side-nav/side-nav.component';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from './shared-components/footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
declarations: [ 
    HeaderComponent,
    FooterComponent,
    SideNavComponent,

],
imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatListModule,
   RouterModule,
],
exports: [
HeaderComponent,
FooterComponent,
SideNavComponent,
]
})
export class sharedModule {} 

