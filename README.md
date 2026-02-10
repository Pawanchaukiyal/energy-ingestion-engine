# Energy Ingestion Engine

A scalable backend system to ingest energy telemetry from smart meters (AC) and electric vehicles (DC) and provide fast analytics.

Focus: **backend architecture, scalability, and data modeling**.  
No frontend is included by design.

---

## 1. Project Overview

This system is designed to:
- Handle 10,000+ devices
- Accept telemetry every 60 seconds
- Store data for long-term growth
- Provide fast analytics without scanning large tables

Core idea: **design for scale first, then implement**.

---

## 2. Architecture (Simple)

Devices
|
v
Ingestion APIs (NestJS)
|
|--> INSERT -> History Tables (Cold Data)
|--> UPSERT -> Live Tables (Hot Data)
|
v
Analytics API (Fast)


Why this works:
- History tables can grow very large
- Live tables stay small (one row per device)
- Analytics never scan history
- Performance remains stable at scale

---

## 3. Data Model Strategy

### Cold Data (History)
- Append-only (INSERT only)
- Stores every telemetry event

Tables:
- meter_history
- vehicle_history

### Hot Data (Live State)
- One row per device
- Always latest values (UPSERT)

Tables:
- meter_live_state
- vehicle_live_state

---

## 4. Requirements

- Git
- Docker
- Docker Compose
- Postman (for testing)

No need to install Node.js or PostgreSQL locally.

---

## 5. Download, Build, and Run (IMPORTANT)

```bash
git clone https://github.com/Pawanchaukiyal/energy-ingestion-engine.git
cd energy-ingestion-engine
docker-compose down -v
docker-compose up --build
Verify server:
Open http://localhost:3000

Expected:

{
  "service": "Energy Ingestion Engine",
  "status": "running",
  "version": "1.0.0"
}
6. API Reference
6.1 Meter Telemetry (AC)
POST http://localhost:3000/ingest/meter
Payload:

{
  "meterId": "MTR_001",
  "kwhConsumedAc": 5.5,
  "voltage": 220,
  "timestamp": "2026-02-10T10:00:00Z"
}
6.2 Vehicle Telemetry (DC)
POST http://localhost:3000/ingest/vehicle
Payload:

{
  "vehicleId": "VEH_001",
  "kwhDeliveredDc": 4.6,
  "batteryTemp": 32,
  "timestamp": "2026-02-10T10:00:00Z"
}
6.3 Analytics API
GET http://localhost:3000/v1/analytics/performance/VEH_001
Response:

{
  "vehicleId": "VEH_001",
  "acEnergyConsumed": 5.5,
  "dcEnergyDelivered": 4.6,
  "efficiency": 0.84,
  "avgBatteryTemp": 32
}
7. Testing Guide (Easy)
Test 1: History Growth
Send same telemetry multiple times

History count increases

SELECT COUNT(*) FROM meter_history;
Test 2: Live State Update
Send same ID again with new values

Only one row exists

SELECT * FROM meter_live_state WHERE meter_id = 'MTR_001';
Test 3: Analytics
Call analytics API

Response is fast and correct

Test 4: Scale Simulation
Send data for many different IDs

System remains stable

Live tables stay small

History keeps growing

8. Error Handling
Centralized global exception handling

Clean JSON error responses

Example:

{
  "statusCode": 404,
  "path": "/v1/analytics/performance/UNKNOWN",
  "message": "Vehicle not found",
  "timestamp": "2026-02-10T10:30:00Z"
}
9. Assignment Coverage Checklist
High-scale ingestion (10k+ devices) ✅

Meter (AC) and Vehicle (DC) support ✅

PostgreSQL persistence ✅

Hot–Cold data separation ✅

Fast analytics design ✅

Dockerized execution ✅

Backend-only implementation ✅

10. Final Note
This project demonstrates backend engineering where:

Scale is handled by architecture

Performance is predictable

Data growth does not degrade analytics

