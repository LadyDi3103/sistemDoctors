import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctoresComponent } from './doctores.component';

describe('DoctoresComponent', () => {
  let component: DoctoresComponent;
  let fixture: ComponentFixture<DoctoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctoresComponent]
    });
    fixture = TestBed.createComponent(DoctoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
