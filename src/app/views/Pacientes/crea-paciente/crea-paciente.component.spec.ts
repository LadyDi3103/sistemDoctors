import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaPacienteComponent } from './crea-paciente.component';

describe('CreaPacienteComponent', () => {
  let component: CreaPacienteComponent;
  let fixture: ComponentFixture<CreaPacienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreaPacienteComponent]
    });
    fixture = TestBed.createComponent(CreaPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
