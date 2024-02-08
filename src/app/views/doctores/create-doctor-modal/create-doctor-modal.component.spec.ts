import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDoctorModalComponent } from './create-doctor-modal.component';

describe('CreateDoctorModalComponent', () => {
  let component: CreateDoctorModalComponent;
  let fixture: ComponentFixture<CreateDoctorModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDoctorModalComponent]
    });
    fixture = TestBed.createComponent(CreateDoctorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
