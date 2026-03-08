# Authentication Module 🔐

Welcome to the **Authentication Module** for KeepITs API. This module is responsible for managing user identities, issuing secure tokens, and handling sessions robustly utilizing modern cryptographic standards (PASETO) instead of conventional JWTs.

![Sequence Diagrams](https://res.cloudinary.com/cs74as-sjoaaaaaaaaaaaadsa/image/upload/v1772991519/auth_cdqfzx)

## 📂 Directory Structure

- `Controller/`: Express route handlers for auth endpoints.
- `DTO/`: Data Transfer Objects for validation typing (e.g., `RegisterDTO`, `loginDTO`).
- `Pipe/`: Contains token generation logic (`paseto.pipe.ts`).
- `auth.service.ts`: Decoupled business logic handling database queries for auth flows.
- `sequence_diagram.md`: Mermaid sequence diagrams illustrating the inner workings of auth flows.

## 🚀 Core Features

### 1. Registration (`register.controller.ts`)
- Accepts `email`, `password`, and `name`.
- Defers to `auth.service.ts` to ensure the user does not already exist.
- Creates a new user record. (Password hashing is securely handled by Mongoose pre-save hooks in the User schema).
- Generates PASETO `access_token` and `refresh_token` and stores them in secure HTTP-only cookies.

### 2. Login (`login.controller.ts`)
- Authenticates the user based on `email` and `password`.
- Issues a robust PASETO (Platform-Agnostic Security Tokens) access and refresh token.
- Sets cookies: `__ESAA` (Access Token) and `__ESRA` (Refresh Token) with strict, secure configurations.

### 3. Token Refresh (`refresh.controller.ts`)
- Automatically extends user sessions securely without requiring re-authentication.
- Extracts `refresh_token` from cookies.
- Verifies the signature securely using the `PUBLIC_REFRESH_TOKEN_SECRET`.
- Calculates remaining token duration and issues a fresh pair of access and refresh tokens synced to the original token lifespan.
- Automatically handles token invalidity with 401 Unauthorized responses.

### 4. Logout (`logout.controller.ts`)
- Safely terminates the user session.
- Instructs the client browser to immediately clear `access_token`, `refresh_token`, and `pending_token` cookies.

## ⚙️ How It Works (Under the Hood)

- **PASETO Protocol**: We use PASETO v4 (`paseto` package) instead of JWT. This removes common cryptographic pitfalls found in JOSE (JSON Object Signing and Encryption) standards. Token keys are asymmetrical (Public/Private keypairs).
- **Service Layer Pattern**: `auth.service.ts` abstracts Mongoose queries away from controllers, ensuring controllers strictly deal with Express request/response lifecycles.

## 📊 Sequence Diagram
For a detailed step-by-step logic map of the above operations, view the [Sequence Diagram](sequence_diagram.md) provided in this directory.
