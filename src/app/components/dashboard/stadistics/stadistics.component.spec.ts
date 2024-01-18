import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadisticsComponent } from './stadistics.component';

describe('StadisticsComponent', () => {
  let component: StadisticsComponent;
  let fixture: ComponentFixture<StadisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StadisticsComponent]
    });
    fixture = TestBed.createComponent(StadisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
