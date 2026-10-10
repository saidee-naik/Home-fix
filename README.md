

# HomeFix

HomeFix is a local home-service platform designed to help users discover and connect with service providers across Goa.

The platform provides provider discovery, search and filtering, provider registration, and an admin workflow for managing and approving service providers.

---

## Features

### Customer

- Browse approved service providers
- Search providers
- Filter by service category
- Filter by location
- View provider details
- View experience and estimated pricing
- Access provider contact information

### Service Provider

- Register as a service provider
- Select service category and location
- Add experience and pricing details
- Add professional description
- Upload profile image
- Submit profile for admin approval

### Admin

- Secure admin authentication
- View and manage providers
- Add providers
- Approve or reject registrations
- Delete providers
- Search and filter providers
- Sort and paginate provider records
- View provider statistics

---

## Services

HomeFix currently supports:

- Plumbing
- Electrical
- Cleaning
- Painting
- HVAC
- Carpentry
- Pest Control
- Locksmith

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Backend | Next.js API Routes |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Authentication | JWT, HTTP-only Cookies |
| Image Storage | Cloudinary |
| API Testing | Thunder Client / Postman |
| Version Control | Git, GitHub |
| Deployment | Vercel |

---

## Architecture

```text
                    HomeFix
                       │
        ┌──────────────┴──────────────┐
        │                             │
     Frontend                       Backend
        │                             │
    Next.js                    Next.js API Routes
        │                             │
        │                         Mongoose
        │                             │
        └──────────────┬──────────────┘
                       │
                  MongoDB Atlas
                       │
                  Provider Data


---

Provider Workflow

Provider Registration
        ↓
Frontend Validation
        ↓
POST /api/providers
        ↓
MongoDB
        ↓
Status: pending
        ↓
Admin Review
     ↙       ↘
 Approve    Reject
    ↓
Public Provider Listing

New provider registrations are not immediately displayed publicly. They are stored with a pending status and become available after admin approval.


---

API

Provider Registration

POST /api/providers

Registers a new service provider.

Public Provider Listing

GET /api/providers

Returns approved providers.

Provider Details

GET /api/providers/:id

Returns details of a specific provider.

Provider Search & Filtering

Providers can be searched and filtered using supported category and location parameters.


---

Provider Data

A provider record contains:

name
phone
email
category
location
experience
priceMin
priceMax
imageUrl
description
status
createdAt
updatedAt

Provider status:

pending
approved
rejected


---

Project Structure

Home-fix/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── providers/
│   │   ├── admin/
│   │   ├── services/
│   │   └── page.tsx
│   │
│   ├── components/
│   ├── lib/
│   │   └── mongodb.ts
│   │
│   └── models/
│       └── Provider.ts
│
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md




Development

The project uses Git and GitHub for collaborative development.

Development work is organized using feature branches:

main
 │
 ├── feature/provider-discovery
 ├── feature/admin-portal
 └── feature/service-results-page

Changes should be developed and tested on a feature branch before being merged into main.


---

Validation & Security

The application implements validation at both frontend and backend levels.

Examples include:

Required field validation

Email validation

Indian mobile number validation

Experience validation

Price validation

Minimum/maximum price validation

Duplicate provider email protection

Protected admin APIs

JWT-based authentication

HTTP-only authentication cookies



---

Deployment

The application is deployed using Vercel.

The production application uses environment variables configured through the deployment platform for database and authentication configuration.


---

Project Status

HomeFix is currently under active development.

Current development areas include:

Provider discovery

Provider registration

Admin provider management

Provider approval workflow

Search and filtering

UI improvements



