import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PacientesService } from 'src/app/services/pacientes/pacientes.service';


@Component({
  selector: 'app-detalle-historial-component',
  templateUrl: './detalle-historial-component.html',
  styleUrls: ['./detalle-historial-component.css']
})
export class DetalleHistorialComponent {
  paciente: any;

  constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
  private pacienteService: PacientesService
  ) {}

  ngOnInit() {
    // Obtén el ID del paciente desde los datos del MatDialog
    const pacienteId = this.data.detalleHistorial.IdPaciente;

    // Llama al servicio para obtener los detalles del paciente
    this.pacienteService.getPacienteById(pacienteId).subscribe((paciente) => {
      this.paciente = paciente;
    });
  }
}
