import { TestBed } from '@angular/core/testing';

import { PayService } from './pay.service';

// @ts-ignore
describe('PayService', () => {
  let service: PayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayService);
  });

  // @ts-ignore
  it('should be created', () => {
    // @ts-ignore
    expect(service).toBeTruthy();
  });
});
function beforeEach(arg0: () => void) {
    throw new Error('Function not implemented.');
}

function expect(service: PayService) {
    throw new Error('Function not implemented.');
}

