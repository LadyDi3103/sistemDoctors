import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPacienteComponent } from './datos-paciente.component';

describe('DatosPacienteComponent', () => {
  let component: DatosPacienteComponent;
  let fixture: ComponentFixture<DatosPacienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosPacienteComponent]
    });
    fixture = TestBed.createComponent(DatosPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
