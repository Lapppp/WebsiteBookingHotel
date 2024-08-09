import { TestBed } from '@angular/core/testing';

import { BookingService } from './booking.service';

// @ts-ignore
describe('BookingService', () => {
  let service: BookingService;
// @ts-ignore
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingService);
  });
// @ts-ignore
  it('should be created', () => {
    // @ts-ignore
    expect(service).toBeTruthy();
  });
});
