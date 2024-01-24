import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCitaComponent } from './create-cita.component';

describe('CreateCitaComponent', () => {
  let component: CreateCitaComponent;
  let fixture: ComponentFixture<CreateCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCitaComponent]
    });
    fixture = TestBed.createComponent(CreateCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
