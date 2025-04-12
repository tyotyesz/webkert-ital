import { TestBed } from '@angular/core/testing';

import { TermekekService } from './termekek.service';

describe('TermekekService', () => {
  let service: TermekekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermekekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
