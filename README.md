# Finance Tracker

## Setup Instructions

### Client
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
```

### Server
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
JWT_SECRET=your_secret_key
```

Start the server:
```bash
npm run dev
```