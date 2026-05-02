# Lost and Found Backend

Simple backend project for Lost and Found website. Users can use it to find items or return found items.

## About Project

A clean and efficient backend for a **Lost & Found** platform. Users can register, post lost or found items with photos, browse listings, submit claims, and manage their profile.

## Tech Stack

- Node.js + Express
- Prisma ORM + PostgreSQL
- JWT Authentication + bcryptjs
- Multer + Cloudinary (image uploads)
- Socket.io (planned)
- BullMQ + Redis (planned)
- dotenv, cors, helmet

Infrastructure

- Frontend → Vercel / Cloudflare Pages
- Backend → Railway / Render / Hetzner
- Database → PostgreSQL (managed)
- Images → Cloudinary

## Quick Start

1. Clone the repository

```bash
git clone https://github.com/TRakhym/lost-and-found-project-backend
cd project-backend
```

2. Install dependencies

```bash
npm install
```

3. Create .env file in the root folder:


4. Setup database

```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. Run in development

```bash
npm run dev
```

Server will start at [http://localhost:5000](http://localhost:5000)

## Environment Variables
 
Create a `.env` file in the **backend** root:
 
```bash
# Database
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/tapqoi?schema=public"
 
# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
 
# JWT
JWT_SECRET=your_very_secret_key
 
# Server
PORT=5000
```

## Database Schema
 
```
User
  id          String   @id @default(uuid())
  email       String   @unique
  password    String
  name        String
  phone       String?
  avatarUrl   String?
  items       Item[]
  claims      Claim[]
 
Item
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  type        ItemType (LOST | FOUND)
  status      ItemStatus (OPEN | CLAIMED | RESOLVED)
  location    String
  date        DateTime
  category    String   @default("Other")
  userId      String
  user        User
  photos      Photo[]
  claims      Claim[]
  createdAt   DateTime @default(now())
 
Photo
  id          Int    @id
  url         String
  publicId    String
  itemId      Int
  item        Item
 
Claim
  id          Int         @id @default(autoincrement())
  itemId      Int
  userId      String
  message     String?
  status      ClaimStatus (PENDING | ACCEPTED | REJECTED)
  item        Item
  user        User
  createdAt   DateTime    @default(now())
```

### Backend (Railway / Render)
 
1. Connect your GitHub repository
2. Set all environment variables from the `.env` section
3. Set start command: `node index.js` or `npm start`
4. Run migrations on first deploy: `npx prisma migrate deploy`

## Team
 
| Name | Role | Email |
|------|------|-------|
| Tagayev Nurzhigit | Project Manager | 230103010@sdu.edu.kz |
| Turakhanov Rakhymzhan | Backend Developer | 230103219@sdu.edu.kz |
| Tekebay Aidyn | UI/UX Designer & Tester | 230103250@sdu.edu.kz |
| Kenzhe Toishyman | Frontend Developer | 230103298@sdu.edu.kz |