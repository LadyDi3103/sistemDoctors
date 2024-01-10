import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { PacientesService } from 'src/app/services/pacientes/pacientes.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { MatPaginator } from '@angular/material/paginator';


// INTERFACE PARA EL TABLE-HEAD
export interface Paciente {
  id: number,
  position: number;
  nombrePaciente: string;
  dni: number;
  telefono: string;
  fechaNacimiento: Date;
  email: string;
  Direccion: string;
  acciones: string;
}


@Component({
  selector: 'app-pacientes',
  templateUrl: 'pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements AfterViewInit, OnInit {
  // paciente: Paciente = [];
  displayedColumns: string[] = ['nombrePaciente', 'dni', 'telefono', 'fechaNacimiento', 'email', 'Dirección', 'acciones'];
  dataSource = new MatTableDataSource<Paciente>();
  // dataSource = new MatTableDataSource();
  
  showModalEdit: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // F O R M  R E A C T I V O
  //form: todos los input que recolectan la Data
  form = new FormGroup({
    email: new FormControl(''),
    id: new FormControl(''),
    NombrePaciente: new FormControl(''),
    dni: new FormControl(''),
    Telefono: new FormControl(),
    Direccion: new FormControl(''),
  });

  constructor(
    // private _liveAnnouncer: LiveAnnouncer,
    private pacientesService: PacientesService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.consultarPacientes();
  }
  ngAfterViewInit() {
    this.dataSource.sort= this.sort;
    this.dataSource.paginator = this.paginator;
  }
  // announceSortChange(sortState: Sort): void {
  //   const direction = sortState.direction ? `${sortState.direction}ending` : 'cleared';
  //   this._liveAnnouncer.announce(`Sorted ${direction}`);
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  // consultarPacientes() {
  //   this.pacientesService.getAllPacientes().subscribe({
  //     next: (data: any) => {
  //       this.dataSource.data = data;
  //       console.log(this.dataSource.data);
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   });
  // }

    consultarPacientes() {
    this.pacientesService.getAllPacientes().subscribe({
      next: (data: Paciente[]) => {
        // this.dataSource.data = data;
        this.dataSource = new MatTableDataSource<Paciente>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
        console.log(this.dataSource, "dataSource");
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  openModalToEditPaciente(paciente: any) {
    console.log(paciente, "paciente EDITAR PACIENTES.COMPONENT")
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '900px',
      data: { paciente }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.consultarPacientes();

      console.log(`Paciente ${result.paciente.IdPaciente} editado correctamente 11555`);


    })
  }

  openModalEditUser() {
    this.showModalEdit = true;
  }

  eliminarPacientePorId(paciente: any) {
    console.log(paciente, "paciente");
    if (paciente) {
      Swal.fire({
        title: "Estás seguro?",
        text: "No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SI, Bórralo!"

      }).then((result: any) => {
        if (result.isConfirmed) {
          this.pacientesService.eliminarPaciente(paciente).subscribe({
            next: (res: any) => {
              if (res) {
                console.log(`Paciente ${paciente.paciente} eliminado correctamente`);
                this.consultarPacientes();
                this.swalSuccess();
              }
            },
            error: (error) => {
              console.log(`Error al eliminar el paciente ${paciente.paciente}: ${error}`);
              this.swalError(paciente.NombrePaciente, error);
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.swalCancelled();
        }
      });
    } else {
      console.log("Error al elminiar paciente");
    }
  }

  private swalSuccess() {
    Swal.fire({
      title: "Borrado!",
      text: "El Paciente fue borrado.",
      icon: "success"
    });
  }

  private swalError(nombrePaciente: string, error: any) {
    Swal.fire({
      title: "Error",
      text: `Error al eliminar el paciente ${nombrePaciente}: ${error}`,
      icon: "error"
    });
  }

  private swalCancelled() {
    Swal.fire({
      title: "Cancelado!!!",
      text: "Tu archivo está seguro :)",
      icon: "error"
    });
  }

}
