import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FleetFacade } from '../../facades/fleet.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fleet-list',
  imports: [], // no pipes used
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

  protected getStatusStyles(status: string): string {
    const theme: Record<string, string> = {
      active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      idle: 'bg-slate-50 text-slate-600 border-slate-200',
      maintenance: 'bg-amber-50 text-amber-700 border-amber-200',
      emergency: 'bg-red-50 text-red-700 border-red-200'
    };
    return theme[status] || theme['idle'];
  }

  protected viewOnMap(id: string): void {
    this.facade.selectVehicle(id); // Guarda el ID en el Signal
    this.router.navigate(['/tracking']); // Navega a la página del mapa
  }

}
