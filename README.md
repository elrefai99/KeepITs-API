# KeepITs API

> The official backend API for the [KeepITs](https://keepits.netlify.app) platform.

KeepITs API is a robust, scalable backend service built with Node.js and TypeScript. It powers the task management, user profiling, and potential blog/payment functionalities of the KeepITs frontend application.

## 🚀 Live Application
- **Frontend URL:** [https://keepits.netlify.app](https://keepits.netlify.app)

---

## 🛠️ Built With

This project uses modern backend technologies and libraries:

- **Runtime & Language:** [Node.js](https://nodejs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Caching & Job Queues:** [Redis](https://redis.io/) via [BullMQ](https://docs.bullmq.io/)
- **Event Streaming:** [Kafka](https://kafka.apache.org/) (via KafkaJS)
- **Background Jobs:** [Agenda](https://github.com/agenda/agenda)
- **Security & Validation:** Helmet, CORS, Express-Rate-Limit, Class-Validator
- **Authentication:** [Paseto](https://paseto.io/) & [Bcrypt.js](https://www.npmjs.com/package/bcryptjs)
- **Media Storage:** [Cloudinary](https://cloudinary.com/)
- **API Documentation:** [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express)

---

## 🏗️ Project Structure

The source code (`src/`) is organized into modular directories:

- **`Module/`**: Contains the core business logic (Authentication, User, Tasks, Blog, Payment).
- **`Queue/`**: Manages Redis/BullMQ background tasks and workers.
- **`kafka/`**: Event-driven architecture interactions (Producers/Consumers).
- **`Common/`**: Shared services, interfaces, middlewares, and utilities.
- **`core/`**: Core app configuration and global error handling.

---

## 🌟 Key Features

- **JWT/Paseto Authentication:** Secure token-based user authentication & authorization with OTP and password reset capabilities.
- **Task Management:** CRUD operations and status tracking for user tasks.
- **User Profiles:** Manage personal information and upload avatars via Cloudinary.
- **Event-Driven & Background Jobs:** Smooth handling of emails and data updates non-blockingly using BullMQ, Kafka, and Agenda.
- **Interactive API Documentation:** Provided natively by Swagger.

---

## 💻 Getting Started

Follow these instructions to set up the project on your local machine for development and testing.

### Prerequisites

Ensure you have the following installed before starting:
- **Node.js** (v18 or higher recommended)
- **pnpm** or **npm**
- **MongoDB** (Local or Atlas URL)
- **Redis** Server
- *(Optional)* **Kafka** Cluster (if local event streaming is needed)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd keepits-api
   ```

2. **Install dependencies:**
   This project uses `pnpm-lock.yaml`, so `pnpm` is highly recommended.
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up Environment Variables:**
   Duplicate the `.env.example` file, rename it to `.env`, and populate it with your local development keys.
   ```bash
   cp .env.example .env
   ```
   *Note: Make sure to include your MongoDB URI, Redis Host, Token Secrets, and Cloudinary keys.*

---

## 🏃‍♂️ Running the Application

There are several scripts set up in `package.json` to facilitate local development and production deployment:

### Development Mode

Run the following command to start the Express server and the Queue worker simultaneously using `nodemon` and `concurrently`:

```bash
# For MacOS/Linux
npm run dev

# For Windows
npm run dev:windows
```

### Production Build

To compile TypeScript code into plain JavaScript:
```bash
npm run build
```

Then, start the production server:
```bash
npm run start
```

---

## 📚 API Documentation

Once the server is running, you can access the interactive API documentation and detailed endpoints via Swagger UI:

- **Swagger Docs Interface:** `http://localhost:<PORT>/api-docs`
- **Main HTML Documentation:** `http://localhost:<PORT>/documentation`
- **Specific Module Docs:**
  - `http://localhost:<PORT>/api/documentation/auth`
  - `http://localhost:<PORT>/api/documentation/user`
  - `http://localhost:<PORT>/api/documentation/tasks`
  - `http://localhost:<PORT>/api/documentation/blog`

*(Replace `<PORT>` with your environment port, usually 9000)*

---

## 🧪 Testing

To run the Jest test suites locally:
```bash
# Run all tests
npm run test

# Run tests in local mode
npm run test:local
```

---

## 📜 License

This project is licensed under the ISC License.
