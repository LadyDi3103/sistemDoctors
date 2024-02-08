import { Component, Inject, OnInit  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Asegúrate de importar FormBuilder y FormGroup

@Component({
  selector: 'app-form-atencion-cita',
  templateUrl: './form-atencion-cita.component.html',
  styleUrls: ['./form-atencion-cita.component.css']
})
export class FormAtencionCitaComponent {
  formulario: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public detallesCita: any, private fb: FormBuilder) {

    this.formulario = this.fb.group({
      Consulta: ['', Validators.required],
      symptoms: [''],
      OS: [''],
      diag: [''],
      // Otros FormControl...
    });

   }






}
