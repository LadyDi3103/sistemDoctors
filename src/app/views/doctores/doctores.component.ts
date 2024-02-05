import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MedicosService } from 'src/app/services/medicos/medicos.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateDoctorModalComponent } from './create-doctor-modal/create-doctor-modal.component';
import { EditDoctorModalComponent } from './edit-doctor-modal/edit-doctor-modal.component';
import { MatPaginator } from '@angular/material/paginator';

// INTERFACE PARA EL TABLE-HEAD
export interface Doctor {
  // id: number,
  position: number;
  nom_medico: string;
  cod_docum: number;
  celular: string;
  email: string;
  direccion: string;
  acciones: string;
}
@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.css']
})
export class DoctoresComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['nom_medico', 'cod_docum', 'celular', 'email', 'direccion', 'acciones'];
  dataSource = new MatTableDataSource<Doctor>();

  showModalEdit: boolean = false;
  doctor!: Doctor;

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
    private medicosService:MedicosService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.consultarMedicos();
  }
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort): void {
    const direction = sortState.direction ? `${sortState.direction}ending` : 'cleared';
    this._liveAnnouncer.announce(`Sorted ${direction}`);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  consultarMedicos(){
    this.medicosService.getAllMedicos().subscribe({
      next: (data:any) => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource.data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  
  crearUnMedico():void{
      const dialogRef = this.dialog.open(CreateDoctorModalComponent, {
        width: '950px',
        data :{
          // id_medico: null,
          nom_medico: '',
          ape_medico: '',
          tip_docum: '',
          num_docum: '',
          celular: '',
          email: '',
          direccion: ''
        }
      });
    
      dialogRef.afterClosed().subscribe((result: any) => {
        if(result){
          this.medicosService.crearMedico(result).subscribe({
            next: (data: any) => {
              console.log(data);
              console.log(`Medico ${data.nom_medico} creado correctamente`);
              this.consultarMedicos();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Doctor ${result.nom_medico} ${result.ape_medico} creado exitosamente`,
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
  
  openModalToEditMedico(medico:any):void{
    const dialogRef = this.dialog.open(EditDoctorModalComponent, {
          width: '950px',
          data :{ medico }
        });
      
        dialogRef.afterClosed().subscribe((result: any) => {
          this.consultarMedicos();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Doctor ${result.medico.nom_medico} ${result.medico.ape_medico} editado correctamente` ,
            showConfirmButton: false,
            timer: 1500
          });
                console.log(result.medico);
                console.log(`Medico ${result.nom_medico} ${result.ape_medico}editado correctamente`);
              })
            }

  eliminarMedicoPorId(medico:any){
    console.log(medico, "DOCTOR");
    if(medico){
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
          this.medicosService.eliminarMedico(medico).subscribe({
            next: (res: any) => {
              if(res){
                console.log(`Doctor ${medico.id_medico} eliminado correctamente`);
                this.consultarMedicos();
                this.swalSuccess();
              }
            },
            error: (error) => {
              console.log(`Error al eliminar el medico  ${medico.id_medico}: ${error}`);
              this.swalError(medico.nom_medico, error);
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.swalCancelled();
        }
      });
    }else{
      console.log("Error al elminiar DOCTOR");
    }


    //aqui el metodo para eliminar por tip_docum y cod_docum
  }
  private swalSuccess() {
    Swal.fire({
      title: "Borrado!",
      text: "El Doctor fue borrado.",
      icon: "success"
    });
  }
  private swalError(nom_medico: string, error: any) {
    Swal.fire({
      title: "Error",
      text: `Error al eliminar DOCTOR ${nom_medico}: ${error}`,
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