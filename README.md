# AMR Watch Nigeria

An AI-assisted antimicrobial resistance (AMR) surveillance and early-warning **prototype**. This demo organises fictional laboratory observations, displays trends, and flags aggregate patterns for expert review.

## Run locally
1. Install Node.js.
2. In this folder, run `npm install`.
3. Run `npm start`.
4. Open http://localhost:3000.

## Features
- Dashboard metrics and charts
- Add fictional laboratory observations
- Express API and JSON persistence
- Simple transparent rule-based flagging (groups with at least 3 observations and >=50% resistant results)

## Demo and safety notice
All bundled data is fictional and for demonstration only. The pattern flagging is a basic rule, **not a trained AI model, clinical recommendation, validated threshold or real surveillance report**. Do not enter identifiable patient data. Real deployment requires privacy and security review, approved datasets, domain validation, institutional approvals and public-health/clinical partners.
