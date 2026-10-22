import { RoadType, Route } from '../models/route.model';
import { MAD_ROUTE_POINTS } from './mad-route-points';
import { MLG_ROUTE_POINTS } from './mlg-route-points';

export const FUEL_CONSUMPTION: Record<RoadType, number> = {
  city: 0.04,
  highway: 0.02,
  road: 0.03
};

export const SPEED: Record<RoadType, { min: number; max: number }> = {
  city: { min: 10, max: 50 },
  highway: { min: 60, max: 120 },
  road: { min: 30, max: 90 }
};

export const ROUTES: Route[] = [
  {
    id: 'MAD-SOL-MAD4',
    name: 'Madrid (Sol to Amazon MAD4)',
    origin: 'Madrid - SOL',
    destination: 'Madrid - Amazon MAD4',
    points: MAD_ROUTE_POINTS
  },
  {
    id: 'MLG-MALAGUETA-DQA3',
    name: 'Málaga (La Malagueta to Amazon DQA3)',
    origin: 'Málaga - La Malagueta',
    destination: 'Málaga - Amazon DQA3',
    points: MLG_ROUTE_POINTS
  }
]