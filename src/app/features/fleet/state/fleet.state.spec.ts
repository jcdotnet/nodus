import { Vehicle } from '../models/vehicle.model';
import { FleetState } from './fleet.state';

describe('FleetState', () => {
  let state: FleetState;

  const mockVehicles: Vehicle[] = [
    {
      id: '1',
      vin: 'MAD-123456',
      plate: '1234-MAD',
      type: 'truck',
      status: 'active',
      routeId: null,
      telemetry: {
        lat: 40.4381,
        lng: -3.6914,
        fuelLevel: 75,
        speed: 85,
        lastUpdate: new Date().toISOString()
      },
      fallbackLat: 40.4168,
      fallbackLng: -3.7038,
    },
    {
      id: '2',
      vin: 'MLG-123456',
      plate: '1234-MLG',
      type: 'van',
      status: 'active',
      routeId: null,
      telemetry: {
        lat: 36.7201,
        lng: -4.4203,
        fuelLevel: 90,
        speed: 0,
        lastUpdate: new Date().toISOString()
      },
      fallbackLat: 36.7213,
      fallbackLng: -4.4214,
    }
  ];

  beforeEach(() => {
    localStorage.clear();
    state = new FleetState();
  });

  it('should initialize with an empty state', () => {
    expect(state.vehicles()).toEqual([]);
    expect(state.activeCount()).toBe(0);
  });

  it('should update vehicles and active count', () => {
    state.setVehicles(mockVehicles);
    expect(state.vehicles()).toEqual(mockVehicles);
    expect(state.activeCount()).toBe(2);
  });

  it('should persist data to storage', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem');

    state.setVehicles(mockVehicles);
    expect(spy).toHaveBeenCalledWith('nodus_fleet_data', JSON.stringify(mockVehicles));
  });

  it('should recover state from storage on init when valid', () => {
    localStorage.setItem('nodus_fleet_data', JSON.stringify(mockVehicles));
    const newState = new FleetState();
    expect(newState.vehicles()).toEqual(mockVehicles);
  });

  it('hould recover empty state from storage on init when data is invalid', () => {
    localStorage.setItem('nodus_fleet_data', 'invalid-json');
    const newState = new FleetState();
    expect(newState.vehicles()).toEqual([]);
  });

  it('should update loading status', () => {
    state.setLoading(true);
    expect(state.loading()).toBe(true);
    state.setLoading(false);
    expect(state.loading()).toBe(false);
  });
});