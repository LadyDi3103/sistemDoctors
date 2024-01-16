import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CitasService } from 'src/app/services/citas/citas.service';

@Component({
  selector: 'app-create-cita',
  templateUrl: './create-cita.component.html',
  styleUrls: ['./create-cita.component.css']
})
export class CreateCitaComponent {
  form : FormGroup;
  constructor(private fb:FormBuilder,private citasService:CitasService){
    this.form = this.fb.group({
      idMedico: ['', [Validators.required]],
      idPaciente: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      motivo: ['', [Validators.required]],
    })
  }
  async handleSubmit(){
    console.log(this.form.value);
    const response = await firstValueFrom(this.citasService.createCita(this.form.value))
    console.log(response,"RESPIONSNDNSDMASNDN");
    
  } 
}
