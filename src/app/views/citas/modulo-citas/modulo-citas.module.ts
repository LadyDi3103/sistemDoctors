import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ListaCitasComponent } from '../lista-citas/lista-citas.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CitasComponent } from '../citas.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormAtencionCitaComponent } from '../form-atencion-cita/form-atencion-cita.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';



@NgModule({
  declarations: [
ListaCitasComponent,
CitasComponent,
FormAtencionCitaComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FullCalendarModule,
    MatGridListModule,
    MatRadioModule,
    MatDatepickerModule,
    DatePipe,  
  ],
  providers: [
    DatePipe 
  ],
})
export class ModuloCitasModule { }
