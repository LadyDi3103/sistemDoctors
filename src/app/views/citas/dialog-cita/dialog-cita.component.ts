import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-cita',
  templateUrl: './dialog-cita.component.html',
  styleUrls: ['./dialog-cita.component.css']
})
export class DialogCitaComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {}
}
