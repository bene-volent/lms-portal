import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { courseRegisteredGuard } from './course-registered.guard';

describe('courseRegisteredGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => courseRegisteredGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
