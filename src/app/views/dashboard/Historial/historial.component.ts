import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PacientesService } from 'src/app/services/pacientes/pacientes.service';
import { DialogCitaComponent } from '../dialog-cita/dialog-cita.component';

export interface Tratamiento {
  Tratamiento: string;
  Fecha: string;
  TA: number;
  Fc: number;
  Kg: number;
  CinCad: string;
  Ejercicio: string;
}

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnChanges {
  @Input()IdPaciente:any;
  paciente = {}
  idCurrentPatient = 0;

  tratamientos: Tratamiento[] = [
    { Tratamiento: 'botox', Fecha: '01-11-2024', TA: 120, Fc: 80, Kg: 70, CinCad: 'Cin', Ejercicio: 'Sí' },
    { Tratamiento: 'filler', Fecha: '05-11-2024', TA: 120, Fc: 80, Kg: 70, CinCad: 'Cin', Ejercicio: 'Sí' },
    { Tratamiento: 'laser', Fecha: '09-11-2024', TA: 120, Fc: 80, Kg: 70, CinCad: 'Cin', Ejercicio: 'Sí' },
    // Agrega más datos según sea necesario
  ];

  displayedColumns: string[] = ['Tratamiento', 'Fecha', 'TA', 'Fc', 'Kg', 'CinCad', 'Ejercicio'];

  constructor(public dialog: MatDialog, private pacienteService: PacientesService){}
ngOnChanges(changes: SimpleChanges): void {
  if(changes["IdPaciente"] ) {
    console.log("IdPaciente", this.IdPaciente);
    
}
}
  openDialog(): void {
    this.pacienteService.getCitaData(this.paciente).subscribe((data) => {
      const dialogRef = this.dialog.open(DialogCitaComponent, {
        width: '950px',
        data: data // Pasa los datos al componente del MatDialog
      });

      dialogRef.afterClosed().subscribe(() => {
        console.log('El diálogo fue cerrado');
      });
    });
  }



}

