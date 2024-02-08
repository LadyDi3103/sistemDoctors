import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `<footer>
    <mat-toolbar class="reserved">
    MediClinic ©Derechos Reservados 2023
</mat-toolbar>
</footer>`,
  styleUrls: ['./footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export  class FooterComponent { }
