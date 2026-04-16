# Nodus Architecture

## Philosophy
Nodus is based on **DDD** (Domain-Driven Design) and **Clean Architecture**. The idea is to keep business logic away from the UI components for better scaling and testing.

## Folders & Layers
- **Core**: Global stuff like Auth, Interceptors and app-wide services.
- **Shared**: Pure UI components (buttons, inputs) and common pipes. No business logic here.
- **Features**: Vertical slices by domain (Fleet, Tracking, Analytics).
- **Styles**: Tailwind config and global SCSS tokens.

## State Management
We use a **Signal-based** approach to avoid unnecessary change detection:
1. **Signals**: For sync state and UI updates.
2. **RxJS**: Only for async streams like polling or WebSockets.
3. **Facade Pattern**: Components only talk to Facades, never directly to the state or services.

## Quick Technical Rules
- **Change Detection**: Always use `OnPush`.
- **Zoneless**: No `zone.js` for better performance.
- **Strict Typing**: No `any` allowed. Everything must be interfaced.

## Roadmap
- [x] **Milestone 1**: Core scaffold and Fleet domain definition.
- [x] **Milestone 2**: Real-time telemetry simulation (RxJS).
- [x] **Milestone 3**: Dashboard implementation and Map integration.
- [x] **Milestone 4**: State persistence and UI performance optimization.
