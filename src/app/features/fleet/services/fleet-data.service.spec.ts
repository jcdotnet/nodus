import { TestBed } from '@angular/core/testing';
import { FleetDataService } from './fleet-data.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { take } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';

describe('FleetDataService', () => {
  let service: FleetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), FleetDataService]
    });
    service = TestBed.inject(FleetDataService);
  });

  it('should return vehicles after the simulated delay', (done: DoneFn) => {
    service.getVehicles().subscribe((data: Vehicle[]) => {
      expect(data.length).toBe(3);
      expect(data[0].plate).toBe('1234-MAD');
      done();
    });
  });

  it('should emit periodic updates for telemetry', (done: DoneFn) => {
    service.getLiveTelemetry().pipe(take(2)).subscribe({
      next: (data) => {
        expect(data.length).toBe(3);
      },
      complete: () => {
        done();
      }
    });
  });

});