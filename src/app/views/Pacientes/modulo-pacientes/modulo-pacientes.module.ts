import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleHistorialComponent } from '../detalle-historia/detalle-historial-component';
import { PacientesComponent } from '../pacientes.component';
import { MatIconModule } from '@angular/material/icon';
import { HistorialComponent } from '../Historial-atenciones/historial.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PacientesService } from 'src/app/services/pacientes/pacientes.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    DetalleHistorialComponent,
    PacientesComponent,
    HistorialComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule, 
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTooltipModule,
    MatSelectModule,
    MatGridListModule,
    HttpClientModule,
  ],
  providers: [PacientesService,
  DialogService],
})
export class ModuloPacientesModule { }
