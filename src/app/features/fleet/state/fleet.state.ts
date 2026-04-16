import { Injectable, signal, computed } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';

@Injectable({ providedIn: 'root' })
export class FleetState {

  private readonly STORAGE_KEY = 'nodus_fleet_data';

  private _loading = signal<boolean>(false);

  // Initialize the signal by calling the private loader
  private _vehicles = signal<Vehicle[]>(this.loadInitialData()); // signal<Vehicle[]>([]);

  // Read-only accessors
  readonly vehicles = computed(() => this._vehicles());
  readonly loading = computed(() => this._loading());

  readonly activeCount = computed(() =>
    this._vehicles().filter(v => v.status === 'active').length
  );

  // Actions
  setVehicles(vehicles: Vehicle[]) {
    this._vehicles.set(vehicles);
    this.saveToStorage(vehicles);
  }

  setLoading(value: boolean) {
    this._loading.set(value);
  }

  /**
  * Persists the current vehicle collection to local storage.
  * @param vehicles The array of vehicles to be stringified and stored.
  */
  private saveToStorage(vehicles: Vehicle[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(vehicles));
  }

  /**
   * Recovers the persisted vehicle state from local storage.
   * @returns An array of vehicles or an empty array if no data is found.
   */
  private loadInitialData(): Vehicle[] {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      // Return empty array if JSON parsing fails or storage is inaccessible
      return [];
    }
  }
}