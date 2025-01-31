# Task Manager API

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

Task Manager is a RESTful API built with **NestJS** and **MongoDB** for task and team management. It enables users to create, assign, and manage tasks within teams, featuring **JWT**-based authentication and user roles.

## Key Features

- **JWT Authentication**: User registration and login with roles (`admin` and `member`)
- **Task Management**: CRUD operations for tasks with states (`pending`, `in-progress`, `completed`)
- **Team Management**: Team creation and member assignment
- **Relationships**: Tasks linked to users and teams
- **API Documentation**: Built-in Swagger UI for endpoint exploration and testing
- **Docker**: Ready-to-deploy configuration with Docker Compose

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (v6.0 or higher)
- [Docker](https://www.docker.com/) (optional, for deployment)

## Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env` file in the project root with:
```env
JWT_SECRET=mySecretKey
MONGO_URI=mongodb://root:rootpassword@localhost:27017/task-manager?authSource=admin
```

4. Start services with Docker (optional)
```bash
docker-compose up -d
```

5. Run the application
```bash
npm run start:dev
```

## Usage

### API Documentation
Visit http://localhost:3000/api to explore the API with Swagger UI.

### Main Endpoints

#### Authentication
- `POST /auth/login`: Sign in
- `POST /auth/register`: Register new user

#### Users
- `POST /users`: Create new user (admin only)
- `GET /users`: List all users (admin only)

#### Tasks
- `POST /tasks`: Create new task
- `GET /tasks`: List user's tasks
- `PATCH /tasks/:id`: Update task

#### Teams
- `POST /teams`: Create new team
- `POST /teams/:id/members`: Add team member
- `GET /teams`: List user's teams

## Project Structure
```
task-manager/
├── src/
│   ├── auth/              # Authentication and JWT
│   ├── tasks/             # Task management
│   ├── teams/             # Team management
│   ├── users/             # User management
│   ├── shared/            # Common utilities
│   ├── app.module.ts      # Main module
│   └── main.ts            # Entry point
├── test/                  # E2E tests
├── docker-compose.yml     # Docker configuration
└── .env                   # Environment variables
```

## Docker Deployment

1. Build the image
```bash
docker-compose build
```

2. Start services
```bash
docker-compose up -d
```

3. Access the API at http://localhost:3000

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or suggestions, please reach out:

- Email: your.email@example.com
- GitHub: [@your-username](https://github.com/your-username)

---

🚀 Thanks for using Task Manager!
