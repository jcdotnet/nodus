import { TestBed } from '@angular/core/testing';

import { RouteService } from './route.service';
import { firstValueFrom } from 'rxjs';
import { ROUTES } from '../data/routes';

describe('Route', () => {
  let service: RouteService;

  beforeEach(() => {
    // No mocks needed because RouteService doesn't depend on external dependencies
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRoutes', () => {
    it('should return the expected routes', async () => {
      const routes = await firstValueFrom(service.getRoutes());

      expect(routes).toEqual(ROUTES);
    });
  });
});
