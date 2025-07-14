# Virtual Event Management System

## ✅ REQUIREMENTS COMPLIANCE

**Project Brief**: Backend system for virtual event management platform with user registration, event scheduling, and participant management using **in-memory data structures**.

### ✅ All Requirements Fulfilled:

1. **✅ Project Setup**: Node.js + Express.js with necessary NPM packages
2. **✅ In-Memory Storage**: Arrays and objects for data storage (no database)
3. **✅ User Authentication**: bcrypt + JWT implementation
4. **✅ User Roles**: Organizers vs attendees distinction
5. **✅ Event Management**: Full CRUD operations for organizers
6. **✅ Participant Management**: Event registration with email notifications
7. **✅ RESTful API Endpoints**: All required endpoints implemented
8. **✅ Asynchronous Operations**: Email notifications with async/await

## 📋 API ENDPOINTS (EXACT AS REQUIRED)

### Authentication

- `POST /register` - User registration with bcrypt hashing
- `POST /login` - User login with JWT token generation

### Event Management

- `GET /events` - Get all events (authenticated users)
- `POST /events` - Create event (organizers only)
- `PUT /events/:id` - Update event (organizers only)
- `DELETE /events/:id` - Delete event (organizers only)
- `POST /events/:id/register` - Register for event (with email notification)

## 🚀 QUICK START

```bash
# Install dependencies
npm install

# Start server
npm start
```

Server runs on `http://localhost:3000`

## 📊 DATA STRUCTURES

**In-Memory Storage** (as required):

- `users[]` - User data with hashed passwords
- `events[]` - Event data with participant lists

## 🧪 TESTING THE API

### 1. Register User

```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "organizer"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Create Event (use token from login)

```bash
curl -X POST http://localhost:3000/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Tech Conference 2025",
    "description": "Annual tech conference",
    "date": "2025-08-15",
    "time": "10:00"
  }'
```

## 🛠 TECHNOLOGY STACK

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **bcrypt** - Password hashing
- **JWT** - Token-based authentication
- **Nodemailer** - Email notifications
- **In-Memory Arrays** - Data storage (no database)

## 📁 PROJECT STRUCTURE

```
src/
├── controllers/
│   ├── authController.js    # User registration/login
│   └── eventController.js   # Event CRUD operations
├── middlewares/
│   └── authMiddleware.js    # JWT authentication
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   └── eventRoutes.js       # Event endpoints
└── utils/
    ├── validation.js        # Input validation
    └── sendEmail.js         # Email notifications
data.js                      # In-memory data storage
server.js                    # Main server file
```

## 🔒 SECURITY FEATURES

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Role-based authorization (organizers/attendees)
- Input validation and sanitization
- Secure error handling

## ✨ KEY FEATURES

- **User Registration**: Secure signup with password hashing
- **Authentication**: JWT-based session management
- **Event Creation**: Organizers can create/manage events
- **Event Registration**: Users can register for events
- **Email Notifications**: Async email confirmations
- **Role Management**: Organizer vs attendee permissions
- **Data Persistence**: In-memory storage as required

## 📝 SUBMISSION READY

This project fully implements all requirements from the brief:

- ✅ All API endpoints working
- ✅ In-memory data structures
- ✅ Authentication & authorization
- ✅ Email notifications
- ✅ Proper error handling
- ✅ Clean code structure
