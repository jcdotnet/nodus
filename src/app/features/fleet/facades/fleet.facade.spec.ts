import { TestBed } from '@angular/core/testing';
import { FleetDataService } from '../services/fleet-data.service';
import { FleetState } from '../state/fleet.state';
import { FleetFacade } from './fleet.facade';
import { Vehicle } from '../models/vehicle.model';
import { of } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';

describe('FleetFacade', () => {
  let facade: FleetFacade;
  let state: FleetState;
  let fleetDataServiceMock: jasmine.SpyObj<FleetDataService>;

  const mockVehicle: Vehicle = {
    id: 'v-1',
    vin: 'VIN-123',
    plate: '1234-MAD',
    type: 'truck',
    status: 'active',
    telemetry: {
      lat: 40.4168,
      lng: -3.7038,
      fuelLevel: 80,
      speed: 90,
      lastUpdate: new Date().toISOString()
    }
  };

  beforeEach(() => {
    const spy = jasmine.createSpyObj('FleetDataService', ['getVehicles', 'getLiveTelemetry']);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        FleetFacade,
        FleetState,
        { provide: FleetDataService, useValue: spy }
      ]
    });

    facade = TestBed.inject(FleetFacade);
    state = TestBed.inject(FleetState);
    fleetDataServiceMock = TestBed.inject(FleetDataService) as jasmine.SpyObj<FleetDataService>;
  });

  it('should load vehicles and start updatesm', () => {

    const mockList = [mockVehicle];
    fleetDataServiceMock.getVehicles.and.returnValue(of(mockList));
    fleetDataServiceMock.getLiveTelemetry.and.returnValue(of(mockList));

    facade.loadVehicles();

    expect(fleetDataServiceMock.getVehicles).toHaveBeenCalled();
    expect(fleetDataServiceMock.getLiveTelemetry).toHaveBeenCalled();
    expect(state.vehicles()).toEqual(mockList);
    expect(state.loading()).toBeFalse();
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