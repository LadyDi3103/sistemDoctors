import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { MedicosService } from '../../../services/medicos/medicos.service';
@Component({
  selector: 'app-edit-doctor-modal',
  templateUrl: './edit-doctor-modal.component.html',
  styleUrls: ['./edit-doctor-modal.component.css']
})
export class EditDoctorModalComponent implements OnInit{
  editDoctorForm!: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<EditDoctorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private medicosService: MedicosService,
    private formBuilder: FormBuilder,
    ) {} 

    ngOnInit(): void {
      console.log("data: ", this.data);
      
      this.editDoctorForm = this.formBuilder.group({
        id_medico: [this.data.medico.id_medico],
        nom_medico: [this.data.medico.nom_medico],
        ape_medico: [this.data.medico.ape_medico],
        tip_docum: [this.data.medico.tip_docum],
        cod_docum: [this.data.medico.cod_docum],
        celular: [this.data.medico.celular],
        email: [this.data.medico.email],
        direccion: [this.data.medico.direccion]
      });
    }

    editarUnDoctor() {
      console.log("DOCTOR: ", this.editDoctorForm.value )
    
      this.medicosService.editarMedico(this.editDoctorForm.value).subscribe({
        next: (data: any) => {
          console.log(data);
          console.log(`DOCTOR ${data.id_medico} editado correctamente`);
          
    
        },
        error: (error) => {
          console.log(`Error al editar doctor ${this.data.medico.id_medico}: ${error}`);
        }
      });
    
    }
  cancelar(): void {
    this.dialogRef.close();
  }
}
