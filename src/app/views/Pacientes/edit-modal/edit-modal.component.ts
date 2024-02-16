import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PacientesService } from 'src/app/services/pacientes/pacientes.service';
import { FormBuilder, FormGroup } from '@angular/forms';


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
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.formulario2 = this.formBuilder.group({
      id: [this.data?.paciente?.id || null],
      nom_paciente: [this.data?.paciente?.nom_paciente || null],
      ape_paciente: [this.data?.paciente?.ape_paciente || null],
      IdTipoDocumento: [this.data?.paciente?.IdTipoDocumento || null],
      num_Documento: [this.data?.paciente?.num_Documento || null],
      num_Cel: [this.data?.paciente?.num_Cel || null],
      email: [this.data?.paciente?.email || null],
      Domicilio: [this.data?.paciente?.Domicilio || null],
    });
  }

  editarPaciente(): void {
    console.log('EDIT');
    const pacienteEditado = this.formulario2.value;
    console.log(pacienteEditado, 'paciente editado');
    
    this.pacientesService.editPaciente(pacienteEditado).subscribe({
      // next: () => {
      //   console.log('ENTRÓ A NEXT');
      //   this.cancelar();
      // },      
      complete: () => {
        console.log('ENTRÓ A complete');
        this.cancelar();
      }
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}