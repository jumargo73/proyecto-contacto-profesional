import { TestBed } from '@angular/core/testing';

import { TaxiServices } from './taxi-services';

describe('TaxiServices', () => {
  let service: TaxiServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxiServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
