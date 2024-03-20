import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateralCartComponent } from './lateral-cart.component';

describe('LateralCartComponent', () => {
  let component: LateralCartComponent;
  let fixture: ComponentFixture<LateralCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LateralCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LateralCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
