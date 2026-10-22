import { Injectable, inject } from '@angular/core';
import { delay, interval, map, Observable, of, startWith, switchMap } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
import { MOCK_VEHICLES } from '../data/mock-vehicles';
import { RouteService } from '../../tracking/services/route.service';
import { RoadType } from '../../tracking/models/route.model';
import { FUEL_CONSUMPTION, SPEED } from '../../tracking/data/routes';

@Injectable({ providedIn: 'root' })
export class FleetDataService {

  private readonly routeService = inject(RouteService);
  private currentVehicles: Vehicle[] = [...MOCK_VEHICLES];

  getVehicles(): Observable<Vehicle[]> {
    return of(MOCK_VEHICLES).pipe(delay(500));
  }

  /**
  * Simulates real-time telemetry updates using RxJS interval
  */
  getLiveTelemetry(): Observable<Vehicle[]> {
    return this.routeService.getRoutes().pipe(
      // Wait for the routes to load before starting the telemetry simulation
      switchMap(routes => interval(3000).pipe(
        startWith(0),
        map(() => {
          this.currentVehicles = this.currentVehicles.map(v => {
            const route = routes.find(route => route.id === v.routeId);
            const currentPosition = v.currentRoutePosition ?? 0;

            let nextPosition = currentPosition;
            if (route && v.status === 'active') {
              nextPosition = Math.min(currentPosition + 1, route.points.length - 1);
            }

            const roadType: RoadType = route?.points[nextPosition].roadType ?? 'road';
            const fuelConsumption = v.status === 'active' ? FUEL_CONSUMPTION[roadType] : 0;

            const { min, max } = SPEED[roadType];
            const speed = v.status === 'active' ? Math.floor(Math.random() * (max - min + 1)) + min : 0;

            return {
              ...v,
              currentRoutePosition: nextPosition,
              status: (route && nextPosition >= route.points.length - 1) ? 'idle' : v.status,
              telemetry: {
                ...v.telemetry,
                lat: route ? route.points[nextPosition].lat : v.telemetry.lat,
                lng: route ? route.points[nextPosition].lng : v.telemetry.lng,
                speed,
                fuelLevel: Math.max(0, v.telemetry.fuelLevel - fuelConsumption),
                lastUpdate: new Date().toISOString()
              }
            };
          });
          return this.currentVehicles;
        })
      )
      ));
  }
}
