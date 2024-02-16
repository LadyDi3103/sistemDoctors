import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import {
  MatPaginatorModule,
  MatPaginatorIntl,
} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { sharedModule } from './shared/shadedModule';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';

import { DashboardComponent } from './views/dashboard/dashboard.component';
import { CreaPacienteComponent } from './views/Pacientes/crea-paciente/crea-paciente.component';
import { DoctoresComponent } from './views/doctores/doctores.component';
import { MatNativeDateModule } from '@angular/material/core';

import { DashboardModule } from './views/dashboard/dashboard.module';

// idioma
import es from '@angular/common/locales/es';
import { CustomMatPaginatorIntl } from './utils/custom-mat-paginator-intl';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CreateCitaComponent } from './components/create-cita/create-cita/create-cita.component';
import { StadisticsComponent } from './components/dashboard/stadistics/stadistics.component';
import { MyLineChartComponent } from './charts/my-line-chart/my-line-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart/pie-chart.component';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart/doughnut-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart/bar-chart.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { HomeComponent } from './views/home/home.component';
import { HomeAdminComponent } from './views/home-admin/home-admin.component';
import { ModuloCitasModule } from './views/citas/modulo-citas/modulo-citas.module';
import { ModuloPacientesModule } from './views/Pacientes/modulo-pacientes/modulo-pacientes.module';

registerLocaleData(es);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CreaPacienteComponent,
    DoctoresComponent,
    CreateCitaComponent,
    StadisticsComponent,
    MyLineChartComponent,
    PieChartComponent,
    DoughnutChartComponent,
    BarChartComponent,
    HomeComponent,
    HomeAdminComponent,
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
    DashboardModule,
    NgChartsModule,
    ModuloCitasModule,
    ModuloPacientesModule,
  ],
  providers: [
    // { provide: MatDialogRef, useValue: {} },
    // { provide: MAT_DIALOG_DATA, useValue: {} }, // Proporciona un valor ficticio para MatMdcDialogData

    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
