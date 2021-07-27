import { TestBed } from '@angular/core/testing';

import { IntroClipService } from './intro-clip.service';

describe('IntroClipService', () => {
  let service: IntroClipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntroClipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
