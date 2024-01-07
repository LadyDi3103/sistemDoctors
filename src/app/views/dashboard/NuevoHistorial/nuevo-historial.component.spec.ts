import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoHistorialComponent } from './nuevo-historial.component';

describe('NuevoHistorialComponent', () => {
  let component: NuevoHistorialComponent;
  let fixture: ComponentFixture<NuevoHistorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoHistorialComponent]
    });
    fixture = TestBed.createComponent(NuevoHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
