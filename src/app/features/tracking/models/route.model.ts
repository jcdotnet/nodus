export type RoadType = 'city' | 'highway' | 'road';

export interface RoutePoint {
  lat: number;
  lng: number;
  roadType?: RoadType;
}

export interface Route {
  id: string;
  name: string;
  origin: string;
  destination: string;
  points: RoutePoint[];
}