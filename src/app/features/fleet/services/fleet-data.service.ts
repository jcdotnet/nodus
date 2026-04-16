import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';

@Injectable({ providedIn: 'root' })
export class FleetDataService {

  getVehicles(): Observable<Vehicle[]> {
    const mockVehicles: Vehicle[] = [
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

    return of(mockVehicles).pipe(delay(800));
  }
}
