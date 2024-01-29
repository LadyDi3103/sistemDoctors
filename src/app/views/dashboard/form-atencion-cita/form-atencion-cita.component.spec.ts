import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAtencionCitaComponent } from './form-atencion-cita.component';

describe('FormAtencionCitaComponent', () => {
  let component: FormAtencionCitaComponent;
  let fixture: ComponentFixture<FormAtencionCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAtencionCitaComponent]
    });
    fixture = TestBed.createComponent(FormAtencionCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
