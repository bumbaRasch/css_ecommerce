# 🚀 Ecommerce NestJS Microservices Challenge

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)](https://redis.io/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)

## 📋 Overview

A microservices application for managing customers and products in an e-commerce platform built with modern technologies. This project demonstrates architectural patterns for scalable backend systems using message-based communication.

## 🏗️ Architecture

The system consists of three microservices:

- **API Gateway** — HTTP API that handles external requests and orchestrates inter-service communication
- **Customers Service** — Manages customer data with its dedicated MySQL database
- **Products Service** — Handles product information with its dedicated MySQL database

Communication between services is implemented via Redis as a message broker, following event-driven architecture patterns.

## 🔧 Technologies Used

- **Backend Framework**: NestJS
- **Language**: TypeScript
- **Message Broker**: Redis
- **Databases**: MySQL
- **API Style**: RESTful
- **Container Orchestration**: Docker & Docker Compose
- **ORM**: Prisma

## 🗄️ Why I Chose Separate Databases for Each Service

I decided to give each microservice (Customers and Products) its own dedicated MySQL database. Here’s why I believe this is the right approach for this project:

- **Loose Coupling:** Services don’t share database schemas or direct access, which keeps their domains clearly separated and independent.
- **Security & Privacy:** Customer data often contains sensitive, personally identifiable information (personenbezogene Daten). By isolating this data in its own database, I can reduce the risk of accidental exposure and apply stricter access controls, which is important for privacy regulations like GDPR.
- **Scalability:** Each service can scale, migrate, or optimize its database independently, without affecting the others.
- **Autonomy:** Teams can evolve their services and database schemas without coordination overhead or risk of breaking other services.
- **Failure Isolation:** Problems in one database (like corruption or migration errors) won’t directly impact the other service.

Also, the services communicate **only via the message broker (Redis)** and have no direct knowledge of each other’s internal data structures or storage. This further enforces the microservices principle of independent, decoupled components.

## 🚀 Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development only)

### Installation & Setup

1. **Clone the repository**

```sh
git clone https://github.com/bumbaRasch/css_ecommerce.git
cd css_ecommerce
```

2. **Copy `.env.example`**

```sh
cp .env.example .env
```

3. **Start all services**

This will start all services, databases, Redis, and Adminer for DB inspection.

- To start all services with logs:

```sh
docker-compose up --build
```

- To start all services in detached mode (without logs):

```sh
docker-compose up --build -d
```

4. **Seed data**

To generate test data, use the following commands:
Where <number> is the number of records to create (e.g., 10).

Create customers

```sh
docker compose exec customers-service npm run seed:customers -- <number>
```

Create products

```sh
docker compose exec products-service npm run seed:products -- <number>
```

### 📂 Project Structure

```markdown
ecommerce-monorepo-challenge/
├── apps/
│ ├── api-gateway/ # API Gateway service
│ ├── customers-service/ # Customer management service
│ └── products-service/ # Product management service
├── libs/ # Shared libraries and utilities
├── docker-compose.yml # Docker Compose configuration
├── .env # Environment variables
└── README.md # Dcumentation
```

### 📡 API Endpoints

| Endpoint             | Method | Description                               |
| -------------------- | ------ | ----------------------------------------- |
| `/api/customers`     | GET    | Retrieve all customers                    |
| `/api/customers/:id` | GET    | Get customer by ID with favorite products |

### 📝 API Documentation (Swagger)

Interactive API documentation is available via Swagger UI:

- [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

You can explore all endpoints, view request/response schemas, and try out requests directly from your browser.

### Check API

The API is available at: http://localhost:3000/api/customers

- Get all customers:

```sh
curl http://localhost:3000/api/customers
```

- Get a customer with "favorite" products:

```sh
curl http://localhost:3000/api/customers/1
```

Example Response

```json
{
  "id": 31,
  "name": "Reginald Yost PhD",
  "email": "Adelia.Gorczany@yahoo.com",
  "createdAt": "2025-05-04T21:40:45.053Z",
  "updatedAt": "2025-05-04T21:40:45.053Z",
  "favorites": [
    {
      "id": 68339,
      "name": "Sleek Bronze Pants",
      "description": "Professional-grade Keyboard perfect for nippy training and recreational use",
      "price": 356.29,
      "createdAt": "2025-05-04T21:41:22.854Z",
      "updatedAt": "2025-05-04T21:41:22.854Z"
    },
    {
      "id": 25587,
      "name": "Tasty Granite Cheese",
      "description": "The sleek and self-reliant Computer comes with salmon LED lighting for smart functionality",
      "price": 336.79,
      "createdAt": "2025-05-04T21:41:22.854Z",
      "updatedAt": "2025-05-04T21:41:22.854Z"
    }
  ]
}
```

## ⚙️ Configuration

The application uses environment variables defined in `.env` file:

### Database Configuration

- `MYSQL_CUSTOMERS_URL`: Connection string for customers database
- `MYSQL_PRODUCTS_URL`: Connection string for products database

### Redis Configuration

- `REDIS_HOST`: Redis server hostname
- `REDIS_PORT`: Redis server port
- `REDIS_PASSWORD`: Redis authentication password

### Application Settings

- `API_GATEWAY_PORT`: Port for the API Gateway service
- `FAVORITE_PRODUCTS_COUNT`: Number of random products to include

## 🛡 Error Handling

The application implements the following error handling strategies:

- **Not Found errors**: 404 responses for non-existent resources
