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
      telemetry: {
        lat: 40.4381,
        lng: -3.6914,
        fuelLevel: 75,
        speed: 85,
        lastUpdate: new Date().toISOString()
      }
    },
    {
      id: '2',
      vin: 'MLG-123456',
      plate: '1234-MLG',
      type: 'van',
      status: 'active',
      telemetry: {
        lat: 36.7201,
        lng: -4.4203,
        fuelLevel: 90,
        speed: 0,
        lastUpdate: new Date().toISOString()
      }
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
    const spy = spyOn(localStorage, 'setItem');
    state.setVehicles(mockVehicles);
    expect(spy).toHaveBeenCalledWith('nodus_fleet_data', JSON.stringify(mockVehicles));
  });

  it('should recover state from storage on init', () => {
    localStorage.setItem('nodus_fleet_data', JSON.stringify(mockVehicles));
    const newState = new FleetState();
    expect(newState.vehicles()).toEqual(mockVehicles);
  });

  it('should update loading status', () => {
    state.setLoading(true);
    expect(state.loading()).toBeTrue();
    state.setLoading(false);
    expect(state.loading()).toBeFalse();
  });
});