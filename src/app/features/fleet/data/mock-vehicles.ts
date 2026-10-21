import { Vehicle } from '../models/vehicle.model';

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: '1',
    vin: 'VR987654321',
    plate: '1234-MAD',
    type: 'truck',
    status: 'active',
    telemetry: { lat: 40.4168, lng: -3.7038, fuelLevel: 82, speed: 90, lastUpdate: new Date().toISOString() }
  },
  {
    id: '2',
    vin: 'VR123456789',
    plate: '1234-BCN',
    type: 'van',
    status: 'idle',
    telemetry: { lat: 41.3851, lng: 2.1734, fuelLevel: 35, speed: 0, lastUpdate: new Date().toISOString() }
  },
  {
    id: '3',
    vin: 'MLG987654321',
    plate: '1234-MLG',
    type: 'truck',
    status: 'active',
    telemetry: {
      lat: 36.7213,
      lng: -4.4214,
      fuelLevel: 85,
      speed: 0,
      lastUpdate: new Date().toISOString()
    }
  }
];