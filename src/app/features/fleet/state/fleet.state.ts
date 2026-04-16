import { Injectable, signal, computed } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';

@Injectable({ providedIn: 'root' })
export class FleetState {

  private _vehicles = signal<Vehicle[]>([]);
  private _loading = signal<boolean>(false);

  readonly vehicles = computed(() => this._vehicles());
  readonly loading = computed(() => this._loading());

  readonly activeCount = computed(() =>
    this._vehicles().filter(v => v.status === 'active').length
  );

  // Actions
  setVehicles(vehicles: Vehicle[]) {
    this._vehicles.set(vehicles);
  }

  setLoading(value: boolean) {
    this._loading.set(value);
  }
}