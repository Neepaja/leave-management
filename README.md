
# Leave Management

A full-stack prototype application for managing employee leave requests, featuring a robust backend built with Node.js, Express, Sequelize ORM, and PostgreSQL for data management. The frontend is developed using Next.js, React, and TypeScript, and styled with Tailwind CSS.

---

## Features

- Employee login and leave application  
- Manager and HR roles to view, approve, or reject leave requests  
- Role-based authentication (**JWT**)  
- RESTful API with **Sequelize migrations** and **seeders** 
- **Middleware setup** for backend authentication and error handling  
- Clean, responsive **frontend built with Next.js, React, and Tailwind CSS**  
- Uses **TypeScript** for type safety  
- Integrated **toast notifications** for user feedback  
- Clean file structure with **API services separated using interfaces**  
- Environment-based configuration support 

---

## Tech Stack

**Server:** 
- Node.js  
- Express  
- Sequelize ORM  
- PostgreSQL  
- JWT for authentication  

**Frontend**
- Next.js
- React
- TypeScript
- Tailwind CSS
- React Toastify

---

## Prerequisites

- Node.js (v16+) installed  
- PostgreSQL installed and running  
- `npm` or `yarn` package manager 

---

## Setup Instructions

## Backend Setup

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
---

# OR for development with auto reload:
```bash
npm run dev
```

### Frontend Setup

```bash
cd leave-management/frontend
npm install

## Start the frontend

```bash
npm run dev
```

## Demo Credentials

Use these credentials to test the application:

**Employee**
- Email: `emp@example.com`
- Password: `emp123`

- Email: `emp2@example.com`
- Password: `emp456`

**Manager**
- Email: `mgr@example.com`
- Password: `mgr123`

**HR**
- Email: `hr@example.com`
- Password: `hr123`


## Assumptions & Known Limitations

- The system assumes a single Manager and HR for demo; role expansion may need adjustments.
- Uses localStorage for JWT token management; consider HttpOnly cookies for production.
- No email verification, password reset, or account recovery flows implemented.
- Leave overlapping validations are basic and may require enhancement for production.
- No notification system integrated for leave status updates.
- Designed for small-scale demo use; scalability and performance optimization are pending.
- UI/UX optimizations and accessibility considerations are minimal in this demo version.
- No Docker or CI/CD setup included in this phase.

---

## License

This project is for demonstration/testing purposes.

---

## Author

Developed by Neepaja Sarvanantham.
