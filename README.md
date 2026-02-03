# MyRoom.world

Your rooms for sales, education, growth, and communities.

## Features

- **7 Room Types**: Sales, Edu, Growth, Health, WorkSafe, Community, Pro
- **Account System**: Signup creates account + room automatically
- **Room Management**: Each room gets a unique shareable link
- **Marketplace**: Upload and sell courses
- **Admin Dashboard**: Manage users, payments, and courses
- **Video Rooms**: Full video call functionality with screen sharing
- **Bilingual**: Romanian (RO) and English (EN) support

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Prisma** - ORM with PostgreSQL
- **Prisma Accelerate** - Database connection pooling
- **Tailwind CSS** - Styling
- **WebRTC** - Video/audio streaming

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Create a `.env` file in the root directory:

```env
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Run Migrations

```bash
npx prisma migrate dev
```

### 5. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:4000`

## Project Structure

```
src/
  app/
    /                    → Homepage with room types
    /signup              → Account creation (creates room)
    /login               → User login
    /room/[id]           → Video room (by slug)
    /marketplace         → Course marketplace
    /admin               → Admin dashboard
    /api/                → API routes
  components/            → React components
  lib/
    db.ts               → Database functions (Prisma)
    prisma.ts            → Prisma client
    auth.ts              → Authentication utilities
  contexts/              → React contexts (Language)
  hooks/                 → Custom React hooks
prisma/
  schema.prisma          → Database schema
  migrations/            → Database migrations
```

## Database Schema

- **Users**: Account information
- **Rooms**: User rooms (created on signup)
- **RoomParticipants**: Track room participants
- **Courses**: Marketplace courses
- **CoursePurchases**: Course purchase records
- **Payments**: Payment tracking

## API Routes

- `POST /api/auth/signup` - Create account + room
- `POST /api/auth/login` - User login
- `GET /api/rooms/[slug]` - Get room by slug
- `GET /api/courses` - Get published courses
- `GET /api/admin/stats` - Admin statistics
- `GET /api/admin/users` - User management
- `PATCH /api/admin/users` - Activate/deactivate users
- `GET /api/admin/courses` - Course management
- `PATCH /api/admin/courses` - Publish/unpublish courses

## User Flow

1. User signs up → Account created
2. Room automatically created with chosen name
3. Room gets unique slug → `/room/[slug]`
4. Share link with participants
5. Participants join via link

## Admin Features

- View statistics (users, rooms, revenue)
- Manage users (activate/deactivate for partners)
- Approve/publish courses
- Track payments

## Development

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Database
npx prisma studio          # Open Prisma Studio
npx prisma migrate dev     # Create migration
npx prisma generate        # Generate Prisma Client
```

## Production Notes

- Replace in-memory storage with Prisma (✅ Done)
- Add proper password hashing (bcrypt)
- Integrate payment gateway (Stripe/Mollie)
- Add file storage for course uploads
- Add JWT token authentication
- Add rate limiting
- Add email notifications
