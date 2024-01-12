import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { PacientesService } from '../../../services/pacientes/pacientes.service';




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
appointment: [new Date()],
genderType: [''],
edad:[],
symptoms: ['', [Validators.required, Validators.minLength(3)]],
signs: ['', [Validators.required, Validators.minLength(3)]],
psique: ['', [Validators.required, Validators.minLength(3)]],
TpAnt: ['', [Validators.required, Validators.minLength(3)]],
Fcos: ['', [Validators.required, Validators.minLength(3)]],
OS:[],
diag:[],
DNI:[],
Domicilio:[],
Tel:[],
FNac:[],
Hijos:[],
Ocupac:[],
Cel:[],
Gpo:[],
EC:[],
Consulta:[],
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
EST:[],
PesoKG:[],
BMI:[],
Diag:[],
PT:[],
KG:[],
DES:[],
MM:[],
ALM:[],
LON:[],
CEN:[],
FDS:[],
Dlk:[],
Like:[],
Tratamientos:[],

})



constructor(private fb: FormBuilder, private pacientesService: PacientesService){

}

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
}









