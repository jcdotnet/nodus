export type VehicleStatus = 'active' | 'maintenance' | 'idle' | 'emergency';

export interface VehicleTelemetry {
  lat: number;
  lng: number;
  fuelLevel: number;
  speed: number;
  lastUpdate: string;
}

export interface Vehicle {
  id: string;
  vin: string;
  plate: string;
  type: 'truck' | 'van' | 'car';
  status: VehicleStatus;
  telemetry: VehicleTelemetry;
}