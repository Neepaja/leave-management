
# Leave Management Backend

A simple full-stack backend prototype for managing employee leave requests, built with Node.js, Express, Sequelize ORM, and PostgreSQL.

---

## Features

- Employee login and leave application  
- Manager and HR roles to view, approve, or reject leave requests  
- Role-based authentication (JWT)  
- RESTful API with Sequelize migrations and seeders 

---

## Tech Stack

**Server:** 
- Node.js  
- Express  
- Sequelize ORM  
- PostgreSQL  
- JWT for authentication  

---

## Prerequisites

- Node.js (v16+) installed  
- PostgreSQL installed and running  
- `npm` or `yarn` package manager 

---

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/your-repo.git
cd your-repo/backend

# Install dependencies
npm install
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```env
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=leave_management
DB_HOST=127.0.0.1
JWT_SECRET=your_jwt_secret_key
```

## Database Setup

```bash
# Create database (if not already created)
npx sequelize-cli db:create

# Run migrations
npx sequelize-cli db:migrate

# (Optional) Seed demo data
npx sequelize-cli db:seed:all
```

## Run The Server

```bash
npm start

```

## License

This project is for demonstration/testing purposes.

---

## Author

Developed by Neepaja Sarvanantham for Reservato.ai Test Task.
