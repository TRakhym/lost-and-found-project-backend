# Lost and Found Service API

Simple backend project for Lost and Found website. Users can use it to find items or return found items.


## About Project

REST API built with Node.js

Users can register, login, post items which is lost or found, view all posts posted there, manage their profile, and submit claims


## Tech Stack

- Node.js + Express
- Prisma ORM + PostgreSQL
- JWT Authentication + bcryptjs
- Multer + Cloudinary (image uploads)
- Socket.io (planned)
- BullMQ + Redis (planned)
- dotenv, cors, helmet


## Quick Start

1. Clone the repository

```bash
git clone https://github.com/TRakhym/lost-and-found-project-backend
cd project-backend
```

2. Install dependencies

```
npm install
```

3. Create .env file in the root folder:

```
DATABASE_URL="postgresql://postgres:72740205@localhost:5432/project-backend-database?schema=public"

CLOUDINARY_CLOUD_NAME=dm6ttdlgm
CLOUDINARY_API_KEY=439185573264234
CLOUDINARY_API_SECRET=Gbs4FrpvbD6rzrqHg1OqljmyK-s

JWT_SECRET=MY_CODE
PORT=3000
```

4. Setup database

```
npx prisma migrate dev --name init
npx prisma generate
```

5. Run in development

```
npm run dev
```

Server will start at [http://localhost:5000](http://localhost:5000)
