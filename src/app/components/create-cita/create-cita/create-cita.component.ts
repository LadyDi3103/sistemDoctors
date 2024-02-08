import {
  Component,
  ViewChild,
  Inject,
  LOCALE_ID,
  OnInit,
  Optional,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { firstValueFrom } from 'rxjs';
import { CitasService } from 'src/app/services/citas/citas.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-create-cita',
  templateUrl: './create-cita.component.html',
  styleUrls: ['./create-cita.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-ES' }],
})
export class CreateCitaComponent implements OnInit {
  datepickerId = 'uniqueDatepickerId'; // Puedes usar el ID que prefieras
  @ViewChild(MatDatepicker) datepicker!: MatDatepicker<any>;

  constructor(
    private fb: FormBuilder,
    private citasService: CitasService,
    @Optional() public dialogRef: MatDialogRef<CreateCitaComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  form = this.fb.group({
    fecha: [null, [Validators.required]],
    id_medico: [null, [Validators.required, Validators.min(1)]],
    id_paciente: [null, [Validators.required, Validators.min(1)]],
    tratamiento: ['', [Validators.required]],
    estado: ['Pendiente'],
  });
  ngOnInit(): void {
    console.log(this.data, 'data dialog');
  }
  openDatepicker() {
    this.datepicker.open();
  }
  close() {
    this.dialogRef.close();
  }
  async crearNuevaCita() {
    console.log(this.form.value);
    const response = await firstValueFrom(
      this.citasService.createCita(this.form.value)
    );
  }
}
