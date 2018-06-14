import { TestBed, inject } from '@angular/core/testing';

import { FormizableService } from './formizable.service';

describe('FormizableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormizableService]
    });
  });

  it('should be created', inject([FormizableService], (service: FormizableService) => {
    expect(service).toBeTruthy();
  }));
});
