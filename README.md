# 📚 **EDUBRIDGE - LEARNING MANAGEMENT SYSTEM**

A modern, full-stack Learning Management System (LMS) built with the MERN stack, featuring course management, user authentication, enrollment tracking, and real-time dashboard analytics.

---

## 🎯 **Features**

### **For Students:**
- 🔐 Secure user registration and authentication
- 📚 Browse and search available courses
- ✅ Enroll in courses with one click
- 📊 Personal dashboard with learning statistics
- 📈 Track course progress and completion
- 🎓 View enrolled courses and recent activities
- 🔍 Advanced course filtering and search

### **For Instructors:**
- 👨‍🏫 Create and manage courses
- 📝 Update course content and details
- 👥 View enrolled students
- 📊 Track student progress
- 💰 Set course pricing

### **For Admins:**
- 👥 User management
- 📚 Course oversight
- 📊 Platform analytics
- 🔧 System configuration

---

## 🛠️ **Tech Stack**

### **Frontend:**
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **TanStack Query (React Query)** - Server state management
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### **Backend:**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### **Development Tools:**
- **Nodemon** - Auto-restart server
- **dotenv** - Environment variables
- **CORS** - Cross-origin resource sharing

---

## 📋 **Prerequisites**

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Package manager
- **Git** - Version control

---

## 🚀 **Installation & Setup**

### **1. Clone the Repository**

```bash
git clone https://github.com/yourusername/edubridge.git
cd edubridge
```

### **2. Backend Setup**

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
notepad .env  # Windows
nano .env     # macOS/Linux
```

**Backend `.env` Configuration:**

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/edubridge

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Optional: MongoDB Atlas (Cloud Database)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/edubridge
```

### **3. Frontend Setup**

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env file (if needed)
cp .env.example .env
```

**Frontend `.env` Configuration (optional):**

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### **4. Database Setup**

#### **Option A: Local MongoDB**

```bash
# Start MongoDB service
# Windows (run as administrator)
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

#### **Option B: MongoDB Atlas (Cloud)**

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`

### **5. Seed Database (Optional)**

```bash
cd backend
npm run seed
```

This creates:
- 5 sample courses
- 3 demo users (student, instructor, admin)
- Sample enrollments

**Demo Accounts:**
- **Student:** `student@demo.com` / `password123`
- **Instructor:** `instructor@demo.com` / `password123`
- **Admin:** `admin@demo.com` / `password123`

---

## 🎮 **Running the Application**

### **Development Mode (Recommended)**

You need **2 terminal windows**:

#### **Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

Expected output:
```
🚀 Server running on port 5000
📡 API available at http://localhost:5000/api
🗄️  MongoDB connected successfully
Database: edubridge
```

#### **Terminal 2 - Frontend:**

```bash
cd frontend
npm start
```

Expected output:
```
Compiled successfully!

You can now view frontend in the browser.
  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

### **Production Mode**

#### **Backend:**

```bash
cd backend
npm start
```

#### **Frontend:**

```bash
cd frontend
npm run build
# Serve the build folder with a static server
```

---

## 🌐 **API Endpoints**

### **Authentication**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| POST | `/api/auth/logout` | Logout user | No |

### **Courses**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/courses` | Get all courses | No |
| GET | `/api/courses/:id` | Get single course | No |
| POST | `/api/courses` | Create course | Yes (Instructor) |
| PUT | `/api/courses/:id` | Update course | Yes (Instructor) |
| DELETE | `/api/courses/:id` | Delete course | Yes (Instructor) |

### **Enrollments**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/enrollments` | Enroll in course | Yes |
| GET | `/api/enrollments/my-courses` | Get user's courses | Yes |
| GET | `/api/enrollments/:id` | Get enrollment details | Yes |
| PUT | `/api/enrollments/:id/progress` | Update progress | Yes |
| DELETE | `/api/enrollments/:id` | Unenroll from course | Yes |

### **Dashboard**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/dashboard/stats` | Get user statistics | Yes |
| GET | `/api/dashboard/activities` | Get recent activities | Yes |

---

## 📁 **Project Structure**

```
edubridge/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── middleware/
│   │   └── auth.js               # JWT authentication
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Course.js             # Course schema
│   │   └── Enrollment.js         # Enrollment schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── courseRoutes.js       # Course endpoints
│   │   ├── enrollmentRoutes.js   # Enrollment endpoints
│   │   └── dashboardRoutes.js    # Dashboard endpoints
│   ├── seeders/
│   │   └── seed.js               # Database seeder
│   ├── .env                      # Environment variables
│   ├── server.js                 # Express server
│   └── package.json              # Dependencies
│
├── frontend/
│   ├── public/
│   │   └── index.html            # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation bar
│   │   │   └── Footer.jsx        # Footer
│   │   ├── hooks/
│   │   │   ├── useAuth.js        # Auth hooks
│   │   │   ├── useCourses.js     # Course hooks
│   │   │   └── useDashboard.js   # Dashboard hooks
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Landing page
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Registration page
│   │   │   ├── Courses.jsx       # Course listing
│   │   │   ├── CourseDetail.jsx  # Course details
│   │   │   └── Dashboard.jsx     # User dashboard
│   │   ├── utils/
│   │   │   └── api.js            # Axios configuration
│   │   ├── App.js                # Main app component
│   │   ├── index.js              # Entry point
│   │   └── index.css             # Global styles
│   └── package.json              # Dependencies
│
└── README.md                     # This file
```

---

## 🎨 **Key Features Explained**

### **1. React Query Integration**

The app uses TanStack Query for efficient server state management:

```javascript
// Automatic caching, refetching, and error handling
const { data: courses, isLoading, error } = useCourses();
```

Benefits:
- ✅ Automatic background refetching
- ✅ Smart caching
- ✅ Optimistic updates
- ✅ Built-in loading and error states
- ✅ DevTools for debugging

### **2. JWT Authentication**

Secure authentication flow:
1. User registers/logs in
2. Backend generates JWT token
3. Token stored in localStorage
4. Token sent with every API request
5. Backend verifies token on protected routes

### **3. Role-Based Access Control**

Three user roles:
- **Student** - Can enroll in courses, track progress
- **Instructor** - Can create and manage courses
- **Admin** - Full platform access

### **4. Responsive Design**

Built with Tailwind CSS for mobile-first responsive design:
- 📱 Mobile (< 768px)
- 💻 Tablet (768px - 1024px)
- 🖥️ Desktop (> 1024px)

---

## 🧪 **Testing**

### **Manual Testing**

1. **Registration Flow:**
   - Go to `/register`
   - Fill form with valid data
   - Verify redirect to dashboard
   - Check localStorage for token

2. **Course Enrollment:**
   - Browse courses at `/courses`
   - Click "Enroll Now"
   - Verify enrollment in dashboard
   - Check stats update

3. **Dashboard:**
   - Verify stats display correctly
   - Check enrolled courses list
   - Test recent activities

### **API Testing with curl**

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'

# Get courses
curl http://localhost:5000/api/courses
```

---

## 🐛 **Troubleshooting**

### **Backend won't start**

**Problem:** Port 5000 already in use

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID [PID] /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### **MongoDB connection error**

**Problem:** `MongooseServerSelectionError`

**Solutions:**
1. Check MongoDB is running: `mongosh` or `mongo`
2. Verify MONGODB_URI in `.env`
3. Check firewall settings
4. Try MongoDB Atlas (cloud)

### **CORS errors**

**Problem:** `Access-Control-Allow-Origin` error

**Solution:** Verify CORS configuration in `backend/server.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### **Frontend can't reach backend**

**Problem:** `ERR_CONNECTION_REFUSED`

**Solutions:**
1. Verify backend is running
2. Check `baseURL` in `frontend/src/utils/api.js`
3. Ensure no firewall blocking port 5000

### **React Query not working**

**Problem:** Queries stay in loading state

**Solutions:**
1. Check React Query DevTools
2. Verify API endpoints return correct data
3. Check network tab for failed requests
4. Ensure QueryClientProvider wraps app

---

## 📊 **Performance Optimization**

### **Frontend:**
- ✅ React Query caching reduces API calls
- ✅ Code splitting with React.lazy()
- ✅ Optimized images and assets
- ✅ Tailwind CSS purging unused styles

### **Backend:**
- ✅ MongoDB indexing on frequently queried fields
- ✅ JWT tokens reduce database queries
- ✅ CORS configured for security
- ✅ Error handling prevents crashes

---

## 🔒 **Security Considerations**

### **Implemented:**
- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ Environment variables for secrets
- ✅ Input validation
- ✅ CORS protection
- ✅ MongoDB injection prevention with Mongoose

### **Recommended for Production:**
- 🔐 HTTPS/SSL certificates
- 🔐 Rate limiting (express-rate-limit)
- 🔐 Helmet.js for security headers
- 🔐 Input sanitization
- 🔐 CSRF protection
- 🔐 Regular security audits

---

## 🚀 **Deployment**

### **Backend (Heroku/Railway/Render)**

```bash
# Install Heroku CLI
heroku create edubridge-api

# Set environment variables
heroku config:set JWT_SECRET=your-secret
heroku config:set MONGODB_URI=your-mongo-uri

# Deploy
git push heroku main
```

### **Frontend (Vercel/Netlify)**

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel

# Or deploy to Netlify
netlify deploy --prod
```

### **Database (MongoDB Atlas)**

1. Create free cluster
2. Get connection string
3. Update MONGODB_URI
4. Whitelist deployment IP

---

## 📝 **Environment Variables**

### **Backend (.env)**

```env
# Required
PORT=5000
MONGODB_URI=mongodb://localhost:27017/edubridge
JWT_SECRET=your-secret-key

# Optional
NODE_ENV=development
JWT_EXPIRE=7d
```

### **Frontend (.env)**

```env
# Optional
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

---

## 📜 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 📞 **Support**

For support, email [email protected] or open an issue on GitHub.

---

## 🗺️ **Roadmap**

### **Phase 1 (Current)** ✅
- User authentication
- Course management
- Enrollment system
- Dashboard analytics

### **Phase 2 (Planned)** 🚧
- [ ] Video lessons integration
- [ ] Quiz and assessment system
- [ ] Certificate generation
- [ ] Payment integration
- [ ] Live chat support

### **Phase 3 (Future)** 📅
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] AI-powered recommendations
- [ ] Social features
- [ ] Multi-language support

---

## 📊 **Project Status**

**Current Version:** 1.0.0  
**Status:** Active Development  
**Last Updated:** November 2025

---

## 🎓 **Learning Resources**

- [React Documentation](https://react.dev/)
- [TanStack Query](https://tanstack.com/query)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Made with ❤️ by the EduBridge Team**