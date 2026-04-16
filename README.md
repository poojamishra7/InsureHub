# InsureHub - Online Insurance Platform

A full-stack web application for managing online insurance policies. Built with Node.js, Angular, and MongoDB.

## 🎯 Features

### Customer Features
- Browse and compare insurance policies
- Generate dynamic quotes
- Purchase policies online
- Manage profile and documents
- Track claims status
- Download policy documents

### Admin Features
- Manage policies (CRUD operations)
- Customer management
- Quote and claim approval workflow
- Premium rate configuration
- Analytics and reporting

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| Backend | Node.js + Express.js |
| Frontend | Angular 17+ |
| Database | MongoDB |
| Authentication | JWT |
| Styling | Angular Material |
| State Management | NgRx |

## 📋 Prerequisites

- Node.js (v18+)
- MongoDB (local or cloud instance)
- npm or yarn

## 🚀 Quick Start

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/poojamishra7/InsureHub.git
cd InsureHub
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm run install-all
\`\`\`

### 3. Configure Environment Variables

**Backend (.env)**
\`\`\`
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/insurehub
JWT_SECRET=your_secret_key
JWT_EXPIRATION=7d
\`\`\`

**Frontend (environment.ts)**
\`\`\`
API_URL = 'http://localhost:5000/api'
\`\`\`

### 4. Start Development Server
\`\`\`bash
npm run dev
\`\`\`

Backend runs on: \`http://localhost:5000\`
Frontend runs on: \`http://localhost:4200\`

## 📂 Project Structure

\`\`\`
InsureHub/
├── server/                 # Backend API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
│   └── package.json
├── client/                 # Frontend Application
│   ├── src/app/
│   │   ├── core/
│   │   ├── features/
│   │   └── shared/
│   └── package.json
└── README.md
\`\`\`

## 🔐 API Endpoints

### Authentication
- \`POST /api/auth/register\` - Register new user
- \`POST /api/auth/login\` - User login

### Policies
- \`GET /api/policies\` - Get all policies
- \`GET /api/policies/:id\` - Get policy details

### Quotes
- \`POST /api/quotes\` - Generate quote
- \`GET /api/quotes/:id\` - Get quote details

### Purchases
- \`POST /api/purchases\` - Create purchase
- \`GET /api/purchases/:id\` - Get purchase details

### Claims
- \`POST /api/claims\` - Submit claim
- \`GET /api/claims/:id\` - Get claim details

## 📖 Documentation

See [docs/](./docs/) directory for detailed documentation.

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Pooja Mishra - Initial work

---

**Happy Coding! 🚀**
EOF
