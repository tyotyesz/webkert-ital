import { TestBed } from '@angular/core/testing';

import { KosarmennyisegService } from './kosarmennyiseg.service';

describe('KosarmennyisegService', () => {
  let service: KosarmennyisegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KosarmennyisegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
