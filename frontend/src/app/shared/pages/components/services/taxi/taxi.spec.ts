import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Taxi } from './taxi';

describe('Taxi', () => {
  let component: Taxi;
  let fixture: ComponentFixture<Taxi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Taxi],
    }).compileComponents();

    fixture = TestBed.createComponent(Taxi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
