import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PacientesService } from 'src/app/services/pacientes/pacientes.service';
import { DialogData } from 'src/app/interfaces/interfaces';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {
  formulario2!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pacientesService: PacientesService,
    private formBuilder: FormBuilder,
  ) {}
  ngOnInit(): void {
    console.log("data NGONINIT: ", this.data);
    
    this.formulario2 = this.formBuilder.group({
      IdPaciente: [this.data.paciente.IdPaciente],
      paciente: [this.data.paciente.paciente],
      IdTipoDocumento:[this.data.paciente.IdTipoDocumento],
      NumeroDocumento: [this.data.paciente.NumeroDocumento],
      Num_Cel: [this.data.paciente.Num_Cel],
      Email: [this.data.paciente.Email],
      Domicilio: [this.data.paciente.Domicilio],
    });
  }



editarPaciente() {
  console.log("paciente: ", this.formulario2.value )
  console.log(" EDITAR EDITMODALCOMPONENT")
  this.pacientesService.editarPaciente(this.formulario2.value).subscribe({
    next: (data: any) => {
      console.log(data);
      // this.cancelar();
      console.log(`Paciente ${this.formulario2.value.paciente.paciente} editado correctamente`);
      // this.pacientesService.getAllPacientes().subscribe({
      //   next: (datos:any)=>{
      //   console.log(datos, "datos");
        
      },
       error: (error) => {
        console.log(error);
      }
      
    });

  }

cancelar(): void {
  this.dialogRef.close();
}
}