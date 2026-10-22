import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Route } from '../models/route.model';
import { ROUTES } from '../data/routes';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  getRoutes(): Observable<Route[]> {
    return of(ROUTES).pipe(delay(500));
  }
}