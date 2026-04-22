# Architecture Overview

The main idea here in this project was to decouple business logic from the UI. I wanted to make the app scalable and easy to test, making sure that components are only responsible for rendering, without being tied to how data is fetched or managed.

## Project Structure
I've organized the code **by domain**. All logic is encapsulated within the `Fleet` feature to avoid side effects and keep the codebase maintainable.

*   **App Root**: Contains the global configuration (`app.config.ts`) and routing definitions.
*   **Features/Fleet**: This is where the core logic lives, including components, facades, models, services, and state.

## State & Performance
This is a **Zoneless** application. I decided to skip `zone.js` to avoid global change detection cycles and improve performance.

*   **Signals**: I use them for state because they only update the parts of the UI that actually change. It's much more efficient for real-time tracking.
*   **RxJS**: Kept strictly for handling async data streams like telemetry.
*   **Facade Pattern**: Components only talk to Facades, which handle the flow between services and the state. This keeps the view layer focused on rendering and easier to maintain.

## Testing Strategy
I focused on testing the parts that handle the most important logic:
*   **State**: Validating transitions and LocalStorage persistence.
*   **Facades**: Testing the logic to ensure the UI gets exactly what it needs.
*   **Services**: Testing that data streams and delays behave as expected.