import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDoctorModalComponent } from './create-doctor-modal/create-doctor-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { EditDoctorModalComponent } from './edit-doctor-modal/edit-doctor-modal.component';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar esto
import { MatSortModule } from '@angular/material/sort';
import { PacientesComponent } from './Pacientes/pacientes.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
    CreateDoctorModalComponent,
    EditDoctorModalComponent,
    PacientesComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSelectModule,
  ]
})
export class DashboardModule { }
