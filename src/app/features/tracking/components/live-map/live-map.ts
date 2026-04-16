import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import * as L from 'leaflet';

import { FleetFacade } from '../../../fleet/facades/fleet.facade';

@Component({
  selector: 'app-live-map',
  imports: [],
  templateUrl: './live-map.html',
  styleUrl: './live-map.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveMap implements OnInit {
  private readonly facade = inject(FleetFacade);
  private mapContainer = viewChild.required<ElementRef>('mapContainer');

  private map!: L.Map;
  private markers = new Map<string, L.Marker>();

  constructor() {
    effect(() => {
      this.updateMarkers(this.facade.vehicles());
    });
  }

  ngOnInit(): void {
    this.facade.loadVehicles();
    this.initMap();
  }


  private initMap(): void {
    this.map = L.map(this.mapContainer().nativeElement).setView([40.4168, -3.7038], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }

  private updateMarkers(vehicles: any[]): void {
    if (!this.map) return;

    // Standard Leaflet icons
    const blueIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    vehicles.forEach(vehicle => {
      const { lat, lng } = vehicle.telemetry;

      if (this.markers.has(vehicle.id)) {
        // Update marker position smoothly
        this.markers.get(vehicle.id)!.setLatLng([lat, lng]);
      } else {
        // Create new marker instance
        const marker = L.marker([lat, lng], { icon: blueIcon })
          .bindPopup(`<b>${vehicle.plate}</b><br>${vehicle.type}`)
          .addTo(this.map);
        this.markers.set(vehicle.id, marker);
      }
    });
  }
}
