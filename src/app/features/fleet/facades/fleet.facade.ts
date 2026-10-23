import { inject, Injectable, signal } from "@angular/core";
import { finalize, switchMap, tap } from "rxjs";

import { FleetDataService } from "../services/fleet-data.service";
import { FleetState } from "../state/fleet.state";


@Injectable({ providedIn: 'root' })
export class FleetFacade {

  private readonly dataService = inject(FleetDataService);
  private readonly state = inject(FleetState);

  private readonly _selectedId = signal<string | null>(null);

  private vehiclesLoaded = false;

  // Expose state as read-only signals
  readonly vehicles = this.state.vehicles;
  readonly loading = this.state.loading;
  readonly activeCount = this.state.activeCount;

  readonly selectedId = this._selectedId.asReadonly();

  /**
   * Initializes the fleet load and then switches to the live telemetry stream
   */
  loadVehicles(): void {
    if (this.vehiclesLoaded) return;

    this.state.setLoading(true);

    this.dataService.getVehicles()
      .pipe(
        tap((data) => {
          this.state.setVehicles(data);
          this.state.setLoading(false);
          this.vehiclesLoaded = true;
        }),
        // Once initial data is loaded, switch to the real-time stream
        switchMap(() => this.dataService.getLiveTelemetry()),
        tap((data) => this.state.setVehicles(data)),
        finalize(() => this.state.setLoading(false)),
      )
      .subscribe();
  }

  selectVehicle(id: string | null): void {
    this._selectedId.set(id);
  }
}