import { TestBed } from '@angular/core/testing';

import { FelhasznaloService } from './felhasznalo.service';

describe('FelhasznaloService', () => {
  let service: FelhasznaloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FelhasznaloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
