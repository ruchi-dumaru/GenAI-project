# GenAI Interview Planner

GenAI Interview Planner is a full-stack application that uses generative AI to
create personalized interview preparation plans. Users can register, log in,
upload a resume or provide a self-description, and add a target job
description. The application then generates technical questions, behavioral
questions, skill gaps, and a preparation roadmap.

## Features

- User registration and login
- Cookie-based authentication with protected routes
- Resume upload for interview-plan generation
- Job-description and self-description input
- AI-generated technical and behavioral interview questions
- Match score and preparation recommendations
- Personalized preparation roadmap
- Interview report history
- AI-generated resume PDF download

## Project structure

```text
GenAI/
├── backend/
│   ├── server.js
│   └── src/
│       ├── config/          # Database configuration
│       ├── controllers/     # Request handlers
│       ├── middlewares/     # Authentication and file upload middleware
│       ├── models/          # MongoDB models
│       ├── routes/          # Express API routes
│       └── services/        # AI integration and local service files
├── frontend/
│   └── src/
│       ├── features/auth/       # Registration and login
│       └── features/interview/  # Interview plan screens and API calls
└── .gitignore
```

## Requirements

- Node.js 18 or newer
- npm
- MongoDB
- A Google Generative AI API key

## Installation

Clone the repository and install dependencies for both applications:

```bash
git clone <your-repository-url>
cd GenAI

cd backend
npm install

cd ../frontend
npm install
```

## Environment variables

Create `backend/.env` from the example file:

```bash
cd backend
copy .env.example .env
```

Set the values in `backend/.env`:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
GOOGLE_GENAI_API_KEY=your_google_generative_ai_key
```

Never commit `.env` or API keys to the repository.

## Running the application

Start the backend in one terminal:

```bash
cd backend
npm run dev
```

The backend runs on `http://localhost:4000`.

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

The frontend runs on the Vite development URL, normally
`http://localhost:5173`.

## API overview

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Register a user |
| `POST` | `/api/auth/login` | Log in a user |
| `GET` | `/api/auth/logout` | Log out and clear the session cookie |
| `GET` | `/api/auth/get-me` | Get the current authenticated user |

### Interview plans

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/interview` | Generate an interview plan |
| `GET` | `/api/interview` | List the current user's reports |
| `GET` | `/api/interview/report/:interviewId` | Get one interview report |
| `POST` | `/api/interview/resume/pdf/:interviewReportId` | Generate a resume PDF |

Interview endpoints require authentication. The interview-generation request
uses `multipart/form-data` with a `resume` file and the `jobDescription` and
`selfDescription` fields.

## Frontend commands

From `frontend/`:

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build
```


