import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FleetFacade } from '../../facades/fleet.facade';
import { Router } from '@angular/router';
import { VehicleStatus } from '../../models/vehicle.model';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-fleet-list',
  imports: [DecimalPipe],
  templateUrl: './fleet-list.html',
  styleUrl: './fleet-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FleetList {

  protected readonly facade = inject(FleetFacade);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.facade.loadVehicles();
  }

  protected getStatusStyles(status: VehicleStatus): string {
    const theme: Record<VehicleStatus, string> = {
      active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      idle: 'bg-slate-50 text-slate-600 border-slate-200',
      maintenance: 'bg-amber-50 text-amber-700 border-amber-200',
      emergency: 'bg-red-50 text-red-700 border-red-200'
    };
    return theme[status];
  }

  protected viewOnMap(id: string): void {
    this.facade.selectVehicle(id);
    this.router.navigate(['/tracking'], {
      state: { focusVehicle: true }
    });
  }
}