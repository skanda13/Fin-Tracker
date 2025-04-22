# Finance Tracker

A full-stack personal finance management application.

## Deployment Instructions

### Prerequisites
- Node.js >= 18.0.0
- MongoDB Atlas account
- Render.com account (or your preferred hosting platform)

### Environment Variables
Create a `.env` file in the server directory with the following variables:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here
```

### Deployment Steps

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Start the Server**
   ```bash
   npm run start
   ```

### API Endpoints

- Base URL: `https://personal-finance-tracker-r1ri.onrender.com`
- Login: `POST /api/auth/login`
- Register: `POST /api/auth/register`
- Get User Profile: `GET /api/users/me`

### Development

To run the application locally:

1. Install dependencies:
   ```bash
   npm install
   cd server && npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Start backend server:
   ```bash
   npm run server:dev
   ```

### Production Deployment

1. Set up environment variables in your hosting platform
2. Configure build and start commands:
   - Build Command: `npm run build`
   - Start Command: `npm run start`
3. Deploy the application

### Troubleshooting

If you encounter issues:
1. Check the server logs
2. Verify environment variables
3. Ensure MongoDB connection is working
4. Check CORS settings if making requests from a different domain