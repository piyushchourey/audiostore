import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateCalculationComponent } from './rate-calculation.component';

describe('RateCalculationComponent', () => {
  let component: RateCalculationComponent;
  let fixture: ComponentFixture<RateCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateCalculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
