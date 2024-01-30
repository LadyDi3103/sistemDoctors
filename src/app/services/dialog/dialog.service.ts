import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormAtencionCitaComponent } from 'src/app/views/dashboard/form-atencion-cita/form-atencion-cita.component';



@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) { }

  abrirFormularioDialog(detallesCita: any) {
    this.dialog.open(FormAtencionCitaComponent, {
      width: '950px',
      data: detallesCita
    });
  }
}
