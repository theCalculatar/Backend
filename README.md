# Simple Auth API with Express and JWT

This is a simple REST API that implements authentication using Express, PostgresSQL, JWT, and bcrypt.

## Installation

1. Clone the repository: [github-link](https://github.com/theCalculatar/Backend)

2. Navigate into the project directory:

3. Install the dependencies:

4. Set up your `.env` file with the appropriate values:

## Usage

### Register User:

- Endpoint: `POST /auth/register`
- Body: `{ "email": "user@example.com", "password": "password123", "surname": "yourSurname", "name": "New User" }`

### Login User:

- Endpoint: `POST /auth/login`
- Body: `{ "email": "user@example.com", "password": "password123" }`

### Protected Route (Example):

- Endpoint: `GET /protected`
- Header: `Authorization: Bearer <token>`
- This route is protected, and requires a valid JWT token for access.
