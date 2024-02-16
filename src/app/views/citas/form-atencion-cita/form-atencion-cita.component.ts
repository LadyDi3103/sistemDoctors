import { Component, Inject, OnInit  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Asegúrate de importar FormBuilder y FormGroup
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form-atencion-cita',
  templateUrl: './form-atencion-cita.component.html',
  styleUrls: ['./form-atencion-cita.component.css']
})
export class FormAtencionCitaComponent implements OnInit {
  formattedCurrentDate!: string;
  formulario: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public detallesCita: any, private fb: FormBuilder, private datePipe: DatePipe) {

    this.formulario = this.fb.group({
      Consulta: ['', Validators.required],
      symptoms: [''],
      OS: [''],
      diag: [''],
      // Otros FormControl...
    });

   }
   ngOnInit(): void {
    this.setCurrentDate();
  }


  
    setCurrentDate(): void {
      const currentDate = new Date();
      this.formattedCurrentDate = this.datePipe.transform(currentDate, 'dd/MM/yyyy') || '';
    console.log(this.formattedCurrentDate, 'dateFormatted');
    
    }


}
