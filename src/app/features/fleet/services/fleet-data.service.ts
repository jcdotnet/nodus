import { Injectable } from '@angular/core';
import { delay, interval, map, Observable, of, startWith } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
import { MOCK_VEHICLES } from '../data/mock-vehicles';

@Injectable({ providedIn: 'root' })
export class FleetDataService {

  getVehicles(): Observable<Vehicle[]> {
    return of(MOCK_VEHICLES).pipe(delay(800));
  }

  /**
  * Simulates real-time telemetry updates using RxJS interval
  */
  getLiveTelemetry(): Observable<Vehicle[]> {
    return interval(3000).pipe(
      startWith(0),
      map(() => MOCK_VEHICLES.map(v => ({
        ...v,
        telemetry: {
          ...v.telemetry,
          speed: v.status === 'active' ? Math.floor(Math.random() * (95 - 80) + 80) : 0,
          fuelLevel: Math.max(0, v.telemetry.fuelLevel - Math.random() * 0.05),
          lastUpdate: new Date().toISOString()
        }
      })))
    );
  }
}
