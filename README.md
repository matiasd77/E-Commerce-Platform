# E-Commerce Platform

A full-stack e-commerce platform built with Spring Boot and React.

## Features

- User Authentication & Authorization
- Product Browsing & Search
- Shopping Cart Management
- Secure Checkout Process
- Payment Integration (Stripe)
- Order Tracking
- Admin Dashboard
- Inventory Management

## Tech Stack

### Backend
- Spring Boot 3.x
- Spring Security with JWT
- Spring Data JPA
- PostgreSQL
- Maven

### Frontend
- React 18
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Axios
- React Router

## Project Structure

```
├── backend/                 # Spring Boot application
│   ├── src/                # Source code
│   ├── .mvn/              # Maven wrapper
│   ├── target/            # Build output
│   ├── pom.xml            # Maven configuration
│   ├── mvnw               # Maven wrapper script (Unix)
│   └── mvnw.cmd           # Maven wrapper script (Windows)
├── frontend/              # React application
│   ├── src/              # Source code
│   ├── public/           # Static assets
│   ├── node_modules/     # Dependencies
│   ├── package.json      # npm configuration
│   ├── package-lock.json # Dependency lock file
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── postcss.config.js # PostCSS configuration
└── README.md             # Project documentation
```

## Prerequisites

- Java 17 or higher
- Node.js 18 or higher
- PostgreSQL 14 or higher
- Maven
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure PostgreSQL database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_platform
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. Build and run the application:
   ```bash
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Environment Variables

### Backend
Create a `.env` file in the backend directory:
```env
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/ecommerce_platform
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Frontend
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

## API Documentation

API documentation is available at `/swagger-ui.html` when running the backend application.

## Security Features

- JWT-based authentication
- Password encryption using BCrypt
- CORS configuration
- Input validation
- SQL injection prevention
- XSS protection
- Secure payment processing with Stripe

## Development Guidelines

### Code Style
- Backend: Follow Spring Boot best practices
- Frontend: Follow React and TypeScript best practices
- Use meaningful commit messages
- Write unit tests for critical functionality

### Git Workflow
1. Create feature branches from `main`
2. Submit pull requests for review
3. Ensure CI/CD pipeline passes
4. Merge only after approval

## Troubleshooting

### Common Issues
1. Database Connection
   - Ensure PostgreSQL is running
   - Verify database credentials
   - Check database port (default: 5432)

2. Frontend Build Issues
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify environment variables

3. Backend Build Issues
   - Ensure Java 17+ is installed
   - Check Maven configuration
   - Verify application.properties

## License

MIT

