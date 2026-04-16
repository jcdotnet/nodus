import { inject, Injectable, signal } from "@angular/core";
import { finalize, switchMap, tap } from "rxjs";

import { FleetDataService } from "../services/fleet-data.service";
import { FleetState } from "../state/fleet.state";

/**
 * Facade used to decouple UI components from RxJS streams and state logic.
 * It provides a clean Signal-based API for the view layer.
 */
@Injectable({ providedIn: 'root' })
export class FleetFacade {

  private readonly dataService = inject(FleetDataService);
  private readonly state = inject(FleetState);

  private readonly _selectedId = signal<string | null>(null);

  // Expose state as read-only signals
  readonly vehicles = this.state.vehicles;
  readonly loading = this.state.loading;
  readonly activeCount = this.state.activeCount;

  readonly selectedId = this._selectedId.asReadonly();

  /**
   * Initializes the fleet load and then switches to the live telemetry stream
   */
  loadVehicles(): void {
    this.state.setLoading(true);

    this.dataService
      .getVehicles()
      .pipe(
        tap((data) => {
          this.state.setVehicles(data);
          this.state.setLoading(false);
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