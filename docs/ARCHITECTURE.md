# Tecnhologies
Angular (signals and zoneless change detection), RxJS, Leaflet to display the routes on the map, and Tailwind CSS.

# Architecture
Nodus follows a feature-based architecture. The goal is to keep related code together and separate the UI from the logic that manages vehicles, routes and telemetry.

The code is organised by **feature**, with Fleet and Tracking as separate areas of the application. Each feature contains the components, models and services related to its **responsibilities**.

**Facades** connect the UI with services and application state, which **allows components to focus on displaying data and handling user interactions**.

**Vehicles and routes** are managed separately. Each vehicle uses `routeId` to identify its assigned route, while the route contains the coordinates that define its path (also the road type to calculate the live speed and fuel consumption).

**RxJS** handles asynchronous operations and the telemetry stream. **Facades** connect these streams and services with the application state, so components only need to interact with the facade.

The app uses Angular Signals to manage state and update the UI when data changes, without relying on `Zone.js`.

# Testing
The tests focus on the parts that contain application logic: state changes and persistence, facade behaviour, and services that provide data and telemetry.