import { TestBed } from '@angular/core/testing';
import { FleetDataService } from './fleet-data.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { firstValueFrom, take, toArray } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';

describe('FleetDataService', () => {
  let service: FleetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), FleetDataService]
    });
    service = TestBed.inject(FleetDataService);
  });

  describe('getVehicles', () => {
    it('should return vehicles after the simulated delay', async () => {
      const data: Vehicle[] = await firstValueFrom(service.getVehicles());

      expect(data.length).toBe(3);
      expect(data[0].plate).toBe('1234-MAD');
    });
  });

  describe('getLiveTelemetry', () => {
    it('should emit an immediate telemetry update', async () => {
      const data = await firstValueFrom(service.getLiveTelemetry());

      expect(data).toBeDefined();
    });

    it('should emit periodic updates for telemetry', async () => {
      const updates = await firstValueFrom(
        service.getLiveTelemetry().pipe(take(2), toArray())
      );
      expect(updates).toHaveLength(2);
    });
  });

});