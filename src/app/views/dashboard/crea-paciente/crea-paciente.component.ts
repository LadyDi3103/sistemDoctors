import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms'
import { PacientesService } from '../../../services/pacientes/pacientes.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-crea-paciente',
  templateUrl: './crea-paciente.component.html',
  styleUrls: ['./crea-paciente.component.css']
})
export class CreaPacienteComponent implements OnInit {

  pacientes:any[]=[];
  form!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private pacientesService: PacientesService,
    public dialogRef: MatDialogRef<CreaPacienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){}

    ngOnInit() {
      this.initializeForm();
    }
  initializeForm() {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate, 'dd/MM/yyyy', 'en-US');

    this.form = this.fb.group({
      paciente: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      edad: [],
      appointment: [formattedDate, Validators.required],
      genderType: [''],
      IdTipoDocumento: [''],
      NumeroDocumento: [''],
      Cel: [],
      Email: [''],
      FNac: [],
      Hijos: [],
      Domicilio: [''],
      Ocupac: [],
      Gpo: [],
      EC: [],
      alergias: [],
      MEN: [],
      SÑO: [],
      Cirugias: [],
      CPO: [],
      NOC: [],
      AntFam: [],
      ANS: [],
      CIG: [],
      AntPers: []
    });
  }

  // Agrega este getter para obtener el control del nombre
  get nombrePaciente() {
    return this.form ? this.form.get('paciente') : null;
  }

crearPacienteNuevo(){
  if(this.form && this.form.valid){
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
  onCancelClick() {
    this.resetForm();
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  private resetForm() {
    this.form.reset({
      paciente: '',
      appointment: new Date(),
      genderType: '',
      // ... (resto de valores iniciales)
    });

    Object.keys(this.form.controls).forEach(controlName => {
      this.form.get(controlName)?.markAsUntouched();
    });
  }
}









