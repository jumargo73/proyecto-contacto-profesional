import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaberMas } from './saber-mas';

describe('SaberMas', () => {
  let component: SaberMas;
  let fixture: ComponentFixture<SaberMas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaberMas],
    }).compileComponents();

    fixture = TestBed.createComponent(SaberMas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
