import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingLayout } from './landing-layout';

describe('LandingLayout', () => {
  let component: LandingLayout;
  let fixture: ComponentFixture<LandingLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
