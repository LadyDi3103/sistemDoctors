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
import { CreaPacienteComponent } from '../crea-paciente/crea-paciente.component';
import { DetalleHistorialComponent } from '../detalle-historia/detalle-historial-component';



// INTERFACE PARA EL TABLE-HEAD
export interface Paciente {
  IdPaciente?: number,
  paciente: string;
  IdTipoDocumento: string;
  NumeroDocumento: number;
  Num_Cel: string;
  FNac: Date;
  Email: string;
  Domicilio: string;
}

interface TransforPaciente{
  id?: number,
  position: number;
  nombrePaciente: string;
  DNI: number;
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

  idCurrentPatient = 0;
  displayedColumns: string[] = ['paciente', 'IdTipoDocumento', 'Num_Cel', 'FNac', 'Email', 'Domicilio', 'acciones'];
  dataSource = new MatTableDataSource<Paciente>();
  // dataSource = new MatTableDataSource();
  
  showModalEdit: boolean = false;
  paciente!: Paciente;
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // F O R M  R E A C T I V O
  //form: todos los input que recolectan la Data
  form = new FormGroup({
    email: new FormControl(''),
    id: new FormControl(''),
    NombrePaciente: new FormControl(''),
    IdTipoDocumento: new FormControl(''),
    NumeroDocumento: new FormControl(''),
    Telefono: new FormControl(),
    Direccion: new FormControl(''),
  });

  constructor(
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  consultarPacientes() {
    this.pacientesService.getAllPacientes().subscribe({
      next: (data: Paciente[]) => {
        // Asigna los datos a this.dataSource.data
        this.dataSource.data = data;
  
        // Configura el ordenamiento y la paginación
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
  
        console.log(this.dataSource, "dataSource");
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  
  crearUnPaciente():void{
    const dialogRef = this.dialog.open(CreaPacienteComponent, {
      width: '950px',
      data :{
        paciente: ' ',
        edad: ' ',
        appointment: ' ',
        genderType: ' ',
        IdTipoDocumento: ' ',
        NumeroDocumento: ' ',
        Num_Cel: ' ',
        Email: ' ',
        FNac: ' ',
        Hijos: ' ',
        Domicilio: ' ',
        Ocupac: ' ',
        Gpo: ' ',
        EC: ' ',
        alergias: ' ',
        MEN: ' ',
        SÑO: ' ',
        Cirugias: ' ',
        CPO: ' ',
        NOC: ' ',
        AntFam: ' ',
        ANS: ' ',
        CIG: ' ',
        AntPer: ' '
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        this.pacientesService.crearPaciente(result).subscribe({
          next: (data: any) => {
            console.log(data);
            console.log(`Paciente ${data.paciente} creado correctamente`);
            this.consultarPacientes();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Paciente ${result.paciente} creado exitosamente`,
              showConfirmButton: false,
              timer: 1500
            });
          },
          error: (error) => {
            console.log(`Error al crear el paciente ${result.nom_medico}: $error}`);
          }
        })
      }
      console.log('El diálogo fue cerrado');
      console.log(result);
    });
  }
  mostrarDetalleHistorial(pacienteId: string) {
    this.pacientesService.getPacienteById(pacienteId)
      .subscribe((detalleHistorial) => {
        this.dialog.open(DetalleHistorialComponent, {
          data: { detalleHistorial },
          width: '950px', 
        });
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

  setCurrentPatient(Id:any):void{
    this.idCurrentPatient = Id;
    console.log(Id, "ID")
    }
    

}

    // paciente: ' ',
    // edad: ' ',
    // appointment: ' ',
    // genderType: ' ',
    // IdTipoDocumento: ' ',
    // NumeroDocumento: ' ',
    // Num_Cel: ' ',
    // Email: ' ',
    // FNac: ' ',
    // Hijos: ' ',
    // symptoms: ' ',
    // signs: ' ',
    // Domicilio: ' ',
    // Ocupac: ' ',
    // Gpo: ' ',
    // EC: ' ',
    // alergias: ' ',
    // MEN: ' ',
    // SÑO: ' ',
    // Cirugias: ' ',
    // CPO: ' ',
    // NOC: ' ',
    // AntFam: ' ',
    // ANS: ' ',
    // CIG: ' ',
    // AntPer: ' '
