# Roxiler Systems Internship - Backend Assignment

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Architecture:** MVC (Model-View-Controller)

## Prerequisites

- Node.js
- PostgreSQL

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure Database:
   - Open `config/config.json` and update the `development` object with your PostgreSQL username, password, and database name.

## Database Setup

Run the migrations to create the required tables (Users, Stores, Ratings):

```bash
npx sequelize-cli db:migrate
```

## Running the Server

Start the backend server:

```bash
node src/app.js
```

The server will start on `http://localhost:3001`.

## API Documentation

### 1. User Signup

- **Endpoint:** `POST /api/users/signup`
- **Description:** Registers a new user (Customer, Store Owner, or Admin).

**Sample JSON Body:**

```json
{
  "name": "Shardul Test",
  "email": "shardul@example.com",
  "password": "securePassword123",
  "address": "123 Tech Street, Bangalore",
  "role": "customer"
}
```

**Test with cURL:** OR POSTMAN
```bash
curl -X POST http://localhost:3001/api/users/signup \
-H "Content-Type: application/json" \
-d '{"name": "Shardul Test", "email": "shardul@example.com", "password": "securePassword123", "address": "123 Tech Street, Bangalore", "role": "customer"}'
```



