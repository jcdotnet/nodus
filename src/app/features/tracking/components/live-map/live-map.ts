import { Component, effect, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';

import { FleetFacade } from '../../../fleet/facades/fleet.facade';
import { Vehicle, VehicleStatus, VehicleType } from '../../../fleet/models/vehicle.model';
import { Route } from '../../models/route.model';
import { RouteService } from '../../services/route.service';

const MAP_ICONS = {
  TRUCK: 'M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z',
  VAN: 'M18 11V6H2v11h1c0 1.66 1.34 3 3 3s3-1.34 3-3h4c0 1.66 1.34 3 3 3s3-1.34 3-3h1v-4l-3-2z'
};

@Component({
  selector: 'app-live-map',
  imports: [],
  templateUrl: './live-map.html',
  styleUrl: './live-map.scss',
})
export class LiveMap implements OnInit {
  private readonly facade = inject(FleetFacade);
  private readonly router = inject(Router);
  private readonly routeService = inject(RouteService);

  private mapContainer = viewChild.required<ElementRef>('mapContainer');

  private map!: L.Map;
  private markers = new Map<string, L.Marker>();
  private routes: Route[] = [];

  constructor() {
    effect(() => {
      this.updateMarkers(this.facade.vehicles());
    });
    effect(() => {
      // Fly to the selectd vehicle and open its popup
      const id = this.facade.selectedId();

      if (!history.state?.focusVehicle || !id || !this.markers.has(id)) {
        return;
      }

      const marker = this.markers.get(id)!;

      this.map.flyTo(marker.getLatLng(), 14, {
        animate: true,
        duration: 2 // seconds
      });
      marker.openPopup();
    });
  }

  ngOnInit(): void {
    this.facade.loadVehicles();
    this.routeService.getRoutes().subscribe(routes => {
      this.routes = routes;
      this.drawRoutes(this.facade.vehicles());
    });
    this.initMap();
  }

  /**
  * Generates a custom SVG icon for Leaflet markers based on vehicle properties.
  * Using DivIcon to avoid external image requests and allow dynamic styling.
  */
  private createVehicleIcon(type: VehicleType, status: VehicleStatus): L.DivIcon {
    const iconPath = type.toLowerCase() === 'truck' ? MAP_ICONS.TRUCK : MAP_ICONS.VAN;
    const color = status === 'active' ? '#2563eb' : '#64748b';

    return L.divIcon({
      className: 'nodus-vehicle-icon',
      html: `
      <svg viewBox="0 0 24 24" width="42" height="42" style="filter: drop-shadow(0 2px 3px rgba(0,0,0,0.3));">
        <circle cx="12" cy="12" r="11" fill="white" stroke="${color}" stroke-width="1.5"/>
        <path d="${iconPath}" fill="${color}" transform="scale(0.7) translate(5, 5)" />
      </svg>`,
      iconSize: [42, 42],
      iconAnchor: [21, 21],
      popupAnchor: [0, -15]
    });
  }

  private drawRoutes(vehicles: Vehicle[]): void {
    const polylines: L.Polyline[] = [];
    vehicles.forEach(vehicle => {
      if (!vehicle.routeId) return;
      const route = this.routes.find(
        route => route.id === vehicle.routeId
      );

      if (!route) return;

      const coordinates: L.LatLngTuple[] = route.points.map(
        point => [point.lat, point.lng]
      );

      const polyline = L.polyline(coordinates, {
        color: '#2563eb',
        weight: 4,
        opacity: 0.8
      }).addTo(this.map);
      polylines.push(polyline);
    });
  }

  private initMap(): void {
    this.map = L.map(this.mapContainer().nativeElement).setView([40.4168, -3.7038], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }

  private updateMarkers(vehicles: Vehicle[]): void {
    if (!this.map) return;

    vehicles.forEach(vehicle => {
      const lat = vehicle.telemetry.lat ?? vehicle.fallbackLat;
      const lng = vehicle.telemetry.lng ?? vehicle.fallbackLng;

      if (this.markers.has(vehicle.id)) {
        // Update marker position smoothly
        const marker = this.markers.get(vehicle.id)!;
        marker.setLatLng([lat, lng]);

        // Refresh icon in case status or type changed during the session
        marker.setIcon(this.createVehicleIcon(vehicle.type, vehicle.status));
      } else {
        const marker = L.marker([lat, lng], {
          icon: this.createVehicleIcon(vehicle.type, vehicle.status)
        })
          .bindPopup(`<b>${vehicle.plate}</b><br>${vehicle.type}`)
          .addTo(this.map);
        this.markers.set(vehicle.id, marker);
      }
    });
  }
}
