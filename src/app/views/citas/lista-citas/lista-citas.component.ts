import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { CitasService } from '../../../services/citas/citas.service';
import { DialogService } from '../../../services/dialog/dialog.service';
import { CreateCitaComponent } from '../../../components/create-cita/create-cita/create-cita.component';

export interface Citas {
  fecha: Date;
  hora: Date;
  paciente: string;
  id_medico: string;
  tratamiento: string;
  estado: string;
}

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.css'],
})
export class ListaCitasComponent implements AfterViewInit, OnInit {
  disabled: boolean = false;
  estadoSeleccionado: string = '';
  displayedColumns: string[] = [
    'fecha',
    'hora',
    'paciente',
    'id_medico',
    'tratamiento',
    'estado',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Citas>();
  estados: string[] = ['PENDIENTE', 'CANCELADO', 'CONFIRMADO', 'REPROGRAMADO'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private dialogService: DialogService,
    private citasService: CitasService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.consultarCitas();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  consultarCitas() {
    this.citasService.getCitas().subscribe({
      next: (citas: Citas[]) => {
        this.dataSource.data = citas;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log('Citas consultadas:', citas);
      },
      error: (error) => {
        console.error('Error al consultar citas:', error);
      },
    });
  }

  abrirFormularioDialog(idPaciente: number) {
    const detallesCita = this.obtenerDetallesCita(idPaciente);
    this.dialogService.abrirFormularioDialog(detallesCita);
  }

  private obtenerDetallesCita(idPaciente: number): any {
    // Lógica para obtener los detalles de la cita desde tu servicio o donde sea necesario
    // Retorna los detalles de la cita como un objeto
    return {
      // ... detalles de la cita
    };
  }

  cambiarEstado(idPaciente: number, nuevoEstado: string) {
    console.log(
      `Se cambió el estado del paciente con ID ${idPaciente} a ${nuevoEstado}`
    );
  }

  getEstadoCellStyle(estado: string): { [key: string]: string } {
    if (estado) {
      switch (estado.toLowerCase()) {
        case 'cancelado':
          return { 'background-color': 'red', color: 'white' };
        case 'pendiente':
          return { 'background-color': 'yellow', color: 'black' };
        case 'confirmado':
          return { 'background-color': 'green', color: 'white' };
        default:
          return {};
      }
    } else {
      return {};
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateCitaComponent, {
      width: '950px',
      data: {
        /* tus datos aquí */
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El diálogo se cerró', result);
      // Puedes realizar acciones después de que se cierre el diálogo si es necesario
    });
  }
  closeList() {
    this.onClose.emit(); // Emitir el evento onClose
    // this.showCalendar = true; // Actualizar la variable para mostrar el calendario
  }
    // Aquí puedes emitir un evento o simplemente cambiar alguna bandera en el componente padre
    // Por ejemplo, puedes tener una variable en el componente padre que controle si se muestra el calendario o la lista de citas
    // Y aquí puedes cambiar el valor de esa variable
  }



