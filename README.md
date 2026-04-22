# Nodus

Nodus (it means "node" or "connection") is a logistics tracking engine built to explore high-performance patterns in Angular. The project focuses on handling real-time telemetry updates through a fully **Zoneless** architecture

I used Angular 20 and signals, DDD to keep the business logic clean, RxJS for the live data stream from the vehicles, Tailwind CSS for the UI and Leaflet for the live map. I chose to stay to stick with the default Karma/Jasmine setup provided by `ng new` rather than migrating to Jest, prioritizing development over test runner configuration. I might consider migrating to Jest in the future.

```bash
npm install
npm start
```
You can find the architecture overview in `docs/ARCHITECTURE.md`.