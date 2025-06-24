# CloudOps

CloudOps is a modern ERP system designed to streamline business operations. It enables users to efficiently manage inventory and stock, raise sales and purchase orders, and review comprehensive analytics for their accounts.

## Features

- **Inventory & Stock Management:** Track and manage your products and stock levels in real time.
- **Sales Orders:** Create, manage, and fulfill sales orders with ease.
![Order List](assets/Order-List.png)
- **Purchase Orders:** Raise and track purchase orders to suppliers.
- **Analytics Dashboard:** Gain insights into your business with detailed analytics and reporting.
![Analytics Dashboard](assets/Home-Dashboard.png)

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- Local database instance (e.g., PostgreSQL, MySQL)

### Database Configuration

- Ensure your local database instance is running.
- Update the `.env` file with your database host, port, username, password, and database name.
- The application will automatically run migrations on startup.

## Developer Notes

-- Command for setting up Docker local postgres instance:
docker pull postgres
docker run --name CloudOps -e POSTGRES_PASSWORD=CloudOpsDockerAdminPassword123_! -d -p 5432:5432 postgres
docker ps (this checks all containers running)
docker exec -it CloudOps psql -U postgres
\l  # List databases
CREATE DATABASE <your_database_name>; # Create a new database
 \c <your_database_name> # Connect to the new database


 Next.js + PostgreSQL (Docker) + Prisma Setup Guide

This guide walks you through setting up a PostgreSQL database using Docker, connecting it to your Next.js app, and managing it with Prisma ORM.

🧱 Part 1: Setting Up PostgreSQL with Docker

✅ One-time setup
docker run --name postgres-db \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=mydatabase \
  -p 5432:5432 \
  -d postgres
POSTGRES_PASSWORD: password for the postgres user
POSTGRES_USER: default user (usually postgres)
POSTGRES_DB: name of the initial database (e.g. mydatabase)
-p 5432:5432: maps local port to container port
🔁 To restart later:

docker start postgres-db
💣 To stop it:

docker stop postgres-db
🔍 Part 2: Accessing Postgres CLI

docker exec -it postgres-db psql -U postgres
Inside the CLI:

List databases: \l
Create new DB: CREATE DATABASE yourdb;
Connect to a DB: \c yourdb
List tables: \dt
Quit: \q
⚙️ Part 3: Connecting Next.js to PostgreSQL

1. Install Prisma
npm install prisma @prisma/client
npx prisma init
This creates:

.env
prisma/schema.prisma
2. Configure .env
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/mydatabase"
Update credentials to match your Docker setup.

3. Define your Prisma models
Example schema.prisma:

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
}
4. Push models to DB
npx prisma db push
5. Query your DB
Create lib/prisma.ts:

import { PrismaClient } from "@prisma/client";

const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
Use it in app/api/users/route.ts:

import prisma from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}
6. View the DB visually
npx prisma studio
Opens a web UI for viewing/editing data.

## Updating Database

run npx prisma migrate dev --name MIGRATION_NAME
- New migration file is generated with latest changes

run npx prisma db pull
- schema.prisma will be updated to reflect new changes

run npx prisma studio to see updated database schema

## License

This project is licensed under the MIT License.

---
*Developed by Josh Ford*