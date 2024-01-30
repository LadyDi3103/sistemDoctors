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
    { Tratamiento: 'filler', Fecha: '05-11-2024', TA: 120, Fc: 80, Kg: 70, CinCad: 'Cin', Ejercicio: 'Sí'},
    { Tratamiento: 'laser', Fecha: '09-11-2024', TA: 120, Fc: 80, Kg: 70, CinCad: 'Cin', Ejercicio: 'Sí'},
    // Agrega más datos según sea necesario
  ];

  displayedColumns: string[] = ['Tratamiento', 'Fecha', 'TA', 'Fc', 'Kg', 'CinCad', 'Ejercicio', 'Acciones'];

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
  detalleConsultaVisible = false;
  detallesConsultaSeleccionada: any; // Puedes definir la estructura según tus datos

  // ...

  mostrarDetalles(element: any) {
      // Aquí puedes realizar lógica para obtener los detalles de la consulta según la fila seleccionada
      // Puedes asignar el resultado a this.detallesConsultaSeleccionada

      // Por ejemplo:
      this.detallesConsultaSeleccionada = this.obtenerDetallesConsulta(element.id);

      // Luego, haces visible la sección de detalles
      this.detalleConsultaVisible = true;
  }

  // Puedes implementar la función obtenerDetallesConsulta según tu lógica
  obtenerDetallesConsulta(id: number): any {
      // Lógica para obtener los detalles de la consulta
      // Retorna un objeto con los detalles
      // Puedes hacer una llamada a tu servicio o manipular directamente tus datos
      return {
          // Detalles de la consulta
      };
  }
 // Función para volver al historial
 volverAlHistorial() {
  // Oculta el detalle y muestra el historial
  this.detalleConsultaVisible = false;
}

}

