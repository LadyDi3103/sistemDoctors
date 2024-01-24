import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';

import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';

import HomeAdminComponent from './views/home-admin/home-admin.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { RouterModule } from '@angular/router';
import { sharedModule } from './shared/shadedModule';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { SideNavComponent } from './views/dashboard/side-nav/side-nav.component';
import { CreaPacienteComponent } from './views/dashboard/crea-paciente/crea-paciente.component';
import { DatosPacienteComponent } from './views/dashboard/datosPaciente/datos-paciente.component';
import { DoctoresComponent } from './views/dashboard/doctores/doctores.component';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';


import { DashboardModule } from './views/dashboard/dashboard.module';


// idioma
import es from '@angular/common/locales/es'
import { CustomMatPaginatorIntl } from './utils/custom-mat-paginator-intl';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CreateCitaComponent } from './components/create-cita/create-cita/create-cita.component';
import { StadisticsComponent } from './components/dashboard/stadistics/stadistics.component';
import { NgChartsModule } from 'ng2-charts';
import { MyLineChartComponent } from './charts/my-line-chart/my-line-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart/pie-chart.component';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart/doughnut-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart/bar-chart.component';


registerLocaleData(es)
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeAdminComponent,
    DashboardComponent,
    SideNavComponent,
    CreaPacienteComponent,
    DatosPacienteComponent,
    DoctoresComponent,
    CreateCitaComponent,
    StadisticsComponent,
    MyLineChartComponent,
    PieChartComponent,
    DoughnutChartComponent,
    BarChartComponent,
 

  ],
  imports: [
    NgChartsModule,
    FullCalendarModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    sharedModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatFormFieldModule,
    MatDialogModule,
  DashboardModule,
  NgChartsModule, 

  ],
  providers: [    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}