import { Injectable } from '@angular/core';
import { delay, interval, map, Observable, of, startWith } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';

@Injectable({ providedIn: 'root' })
export class FleetDataService {

  private mockVehicles: Vehicle[] = [
    {
      id: '1',
      vin: 'VR987654321',
      plate: '1234-KLS',
      type: 'truck',
      status: 'active',
      telemetry: { lat: 40.4168, lng: -3.7038, fuelLevel: 82, speed: 90, lastUpdate: new Date().toISOString() }
    },
    {
      id: '2',
      vin: 'VR123456789',
      plate: '1234-BSC',
      type: 'van',
      status: 'idle',
      telemetry: { lat: 41.3851, lng: 2.1734, fuelLevel: 35, speed: 0, lastUpdate: new Date().toISOString() }
    }
  ];

  getVehicles(): Observable<Vehicle[]> {
    return of(this.mockVehicles).pipe(delay(800));
  }

  /**
  * Simulates real-time telemetry updates using RxJS interval
  */
  getLiveTelemetry(): Observable<Vehicle[]> {
    return interval(3000).pipe(
      startWith(0),
      map(() => this.mockVehicles.map(v => ({
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
