import { TestBed } from '@angular/core/testing';
import { FleetDataService } from '../services/fleet-data.service';
import { FleetState } from '../state/fleet.state';
import { FleetFacade } from './fleet.facade';
import { Vehicle } from '../models/vehicle.model';
import { of } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { Mock } from 'vitest';

describe('FleetFacade', () => {
  let facade: FleetFacade;
  let state: FleetState;

  let fleetDataServiceMock: {
    getVehicles: Mock;
    getLiveTelemetry: Mock;
  };

  const mockVehicle: Vehicle = {
    id: 'v-1',
    vin: 'VIN-123',
    plate: '1234-MAD',
    type: 'truck',
    status: 'active',
    routeId: 'MAD',
    telemetry: {
      fuelLevel: 80,
      speed: 90,
      lastUpdate: new Date().toISOString()
    },
    fallbackLat: 40.4168,
    fallbackLng: -3.7038,
  };

  beforeEach(() => {
    fleetDataServiceMock = {
      getVehicles: vi.fn(),
      getLiveTelemetry: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        FleetFacade,
        FleetState,
        { provide: FleetDataService, useValue: fleetDataServiceMock }
      ]
    });

    facade = TestBed.inject(FleetFacade);
    state = TestBed.inject(FleetState);
  });

  describe('loadVehicles', () => {

    const mockVehicles = [mockVehicle];
    beforeEach(() => {
      // Arrange
      fleetDataServiceMock.getVehicles.mockReturnValue(of(mockVehicles));
      fleetDataServiceMock.getLiveTelemetry.mockReturnValue(of(mockVehicles));
    });

    it('should load vehicles and start updates', () => {
      // Arrange
      // Act
      facade.loadVehicles();

      // Assert
      expect(fleetDataServiceMock.getVehicles).toHaveBeenCalled();
      expect(fleetDataServiceMock.getLiveTelemetry).toHaveBeenCalled();
      expect(state.vehicles()).toEqual(mockVehicles);
      expect(state.loading()).toBe(false);
    });

    it('should not load vehicles again if already loaded', () => {
      // Arrange
      // Act
      facade.loadVehicles();
      facade.loadVehicles();

      // Assert
      expect(fleetDataServiceMock.getVehicles).toHaveBeenCalledTimes(1);
      expect(fleetDataServiceMock.getLiveTelemetry).toHaveBeenCalledTimes(1);
    });

    it('should reset loading after loading vehicles', () => {
      // Arrange
      // Act
      facade.loadVehicles();

      // Assert
      expect(state.loading()).toBe(false);
    });
  });

  it('should update selected vehicle id', () => {
    const testId = 'v-123';
    facade.selectVehicle(testId);
    expect(facade.selectedId()).toBe(testId);
  });

  it('should clear the selected vehicle', () => {
    facade.selectVehicle(null);
    expect(facade.selectedId()).toBeNull();
  });
});