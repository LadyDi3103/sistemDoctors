import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCitaComponent } from './dialog-cita.component';

describe('DialogCitaComponent', () => {
  let component: DialogCitaComponent;
  let fixture: ComponentFixture<DialogCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCitaComponent]
    });
    fixture = TestBed.createComponent(DialogCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
