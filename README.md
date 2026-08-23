# Jobs API

A RESTful API for tracking job applications — register, log in, and manage your own list of job postings (company, position, status). Built with **Node.js**, **Express**, and **MongoDB (Mongoose)**, secured with JWT authentication.

## Tech Stack

- **Node.js** — runtime
- **Express 5** — web framework
- **MongoDB** — database
- **Mongoose 9** — ODM for MongoDB
- **JWT (jsonwebtoken)** — authentication
- **bcryptjs** — password hashing
- **helmet, cors, express-rate-limit** — security middleware
- **dotenv** — environment variable management

## Project Structure

```
Jobs-API/
├── controllers/     # Route handler logic (auths.js, jobs.js)
├── db/               # Database connection setup
├── errors/           # Custom error classes
├── middlewares/       # Auth, error handling, not-found handler
├── model/             # Mongoose schemas (User, Job)
├── routes/            # API route definitions
├── app.js             # App entry point
├── package.json
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js installed
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Abhishek4715/Jobs-API.git
   cd Jobs-API
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:
   ```
   MONGODB_URL=your_mongodb_connection_string_here
   JWT_SECRET=your_jwt_secret_here
   JWT_LIFETIME=1d
   PORT=3000
   ```

4. Start the server
   ```bash
   npm run dev
   ```

The API will be running at `http://localhost:3000`.

## API Endpoints

### Auth — `/api/v1/auths`

| Method | Endpoint      | Description        | Auth Required |
|--------|----------------|----------------------|----------------|
| POST   | `/register`    | Register a new user   | No |
| POST   | `/login`       | Log in, receive a JWT | No |

### Jobs — `/api/v1/jobs`

All job routes require a valid JWT (sent via `Authorization` header) and only return/affect jobs created by the authenticated user.

| Method | Endpoint | Description        |
|--------|-----------|-----------------------|
| GET    | `/`       | Get all your jobs      |
| POST   | `/`       | Create a new job        |
| GET    | `/:id`    | Get a single job        |
| PATCH  | `/:id`    | Update a job             |
| DELETE | `/:id`    | Delete a job              |

**Job fields:** `company` (required), `position` (required), `status` (`interview` | `declined` | `pending`, default `pending`)

## License

This project is open source and available under the [MIT License](LICENSE).
