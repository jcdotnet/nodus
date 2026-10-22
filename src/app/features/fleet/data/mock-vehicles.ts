import { Vehicle } from '../models/vehicle.model';

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: '1',
    vin: 'VR987654321',
    plate: '1234-MAD',
    type: 'truck',
    status: 'active',
    fallbackLat: 40.4168,
    fallbackLng: -3.7038,
    routeId: 'MAD-SOL-MAD4',
    currentRoutePosition: 0,
    telemetry: { fuelLevel: 82, speed: 90, lastUpdate: new Date().toISOString() }
  },
  {
    id: '2',
    vin: 'VR123456789',
    plate: '1234-BCN',
    type: 'van',
    status: 'idle',
    fallbackLat: 41.3851,
    fallbackLng: 2.1734,
    routeId: null,
    telemetry: { fuelLevel: 35, speed: 0, lastUpdate: new Date().toISOString() }
  },
  {
    id: '3',
    vin: 'MLG987654321',
    plate: '1234-MLG',
    type: 'truck',
    status: 'active',
    fallbackLat: 36.7213,
    fallbackLng: -4.4214,
    routeId: 'MLG-MALAGUETA-DQA3',
    telemetry: { fuelLevel: 85, speed: 0, lastUpdate: new Date().toISOString() }
  }
];