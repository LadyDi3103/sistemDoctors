import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-create-doctor-modal',
  templateUrl: './create-doctor-modal.component.html',
  styleUrls: ['./create-doctor-modal.component.css']
})
export class CreateDoctorModalComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateDoctorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  cancelar(): void {
    this.dialogRef.close();
  }

}
