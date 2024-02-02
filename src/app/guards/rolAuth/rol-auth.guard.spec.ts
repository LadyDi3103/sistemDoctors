import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { rolAuthGuard } from './rol-auth.guard';

describe('rolAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => rolAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
