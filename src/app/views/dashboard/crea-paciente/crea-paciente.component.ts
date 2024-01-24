import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { PacientesService } from '../../../services/pacientes/pacientes.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';




@Component({
  selector: 'app-crea-paciente',
  templateUrl: './crea-paciente.component.html',
  styleUrls: ['./crea-paciente.component.css']
})
export class CreaPacienteComponent {

  pacientes:any[]=[];

form = this.fb.group({
paciente: ['', [
Validators.required,
Validators.minLength(5),
Validators.maxLength(60),
]],
edad:[],
appointment: [new Date()],
genderType: [''],
IdTipoDocumento: [''],
NumeroDocumento: [''],
Cel:[],
Email:[''],
FNac:[],
Hijos:[],
Domicilio:[''],
Ocupac:[],
Gpo:[],
EC:[],
alergias:[],
MEN:[],
SÑO:[],
Cirugias:[],
CPO:[],
NOC:[],
AntFam:[],
ANS:[],
CIG:[],
AntPers:[],
})



constructor(
  private fb: FormBuilder, 
  private pacientesService: PacientesService,
  public dialogRef: MatDialogRef<CreaPacienteComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any){}

crearPacienteNuevo(){
  if(this.form.valid){
    const body = this.form.value;
    console.log(body, 'body');
    
    this.pacientesService.crearPaciente(body).subscribe({
      next : (data:any) => {
        this.pacientes = data;
        console.log(this.pacientes, 'Paciente creado exitosamente');
      } ,
      error : (error: any) =>{
        console.log(error, 'error al crear paciente');
      } 
    }
    
    )} else{
      console.error('Formulario no válido');
    }
  }

get nombrePaciente(){
  return this.form.controls['paciente'];
}

  onCancelClick() {
    // Restablecer los valores del formulario a su estado inicial
    this.form.reset({
      paciente: '',
      appointment: new Date(),
      genderType: '',
      // ... (resto de valores iniciales)
    });

    // También puedes marcar todos los controles como no tocados para limpiar los mensajes de validación
    Object.keys(this.form.controls).forEach(controlName => {
      this.form.get(controlName)?.markAsUntouched();
    });
  }
  cancelar(): void {
    this.dialogRef.close();
  }

}









