import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCitasComponent } from './lista-citas.component';

describe('ListaCitasComponent', () => {
  let component: ListaCitasComponent;
  let fixture: ComponentFixture<ListaCitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaCitasComponent]
    });
    fixture = TestBed.createComponent(ListaCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
