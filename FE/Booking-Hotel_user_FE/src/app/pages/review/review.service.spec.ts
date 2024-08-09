import { TestBed } from '@angular/core/testing';

import { ReviewService } from './review.service';

// @ts-ignore
describe('ReviewService', () => {
  let service: ReviewService;
// @ts-ignore
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewService);
  });
// @ts-ignore
  it('should be created', () => {
    // @ts-ignore
    expect(service).toBeTruthy();
  });
});
