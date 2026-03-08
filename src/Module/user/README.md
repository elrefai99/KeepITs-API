# User Module 👤

Welcome to the **User Module** for KeepITs API. This module governs all interactions pertaining to user profiles, data modification, avatar management, and access controls using guard configurations.

![Sequence Diagrams](https://res.cloudinary.com/cs74as-sjoaaaaaaaaaaaadsa/image/upload/v1772991519/User_hndd3h.png)

## 📂 Directory Structure

- `@types/`: Typescript interface definitions acting as the schema blueprint (e.g., `IUser`).
- `Controller/`: Dedicated controllers for retrieving, editing, and deleting users.
- `DTO/`: Data Transfer Objects defining expected request shapes.
- `Guards/`: Express middleware specifically tailored to secure profile actions (`profile.guard.ts`).
- `Schema/`: Mongoose Object Data Modeling (`User.schema.ts`).
- `functions/`: Reusable helper implementations specific to user operations (e.g., `cloudinary.ts` integration).
- `sequence_diagram.md`: Mermaid.js sequence flows for the user lifecycle.

## 🚀 Core Features

### 1. View Profile (`profile.controller.ts`)
- A streamlined endpoint that responds with the active user's details.
- Leverages the `profileGuard` to preemptively authenticate and attach the `req.user` payload before it hits the controller.

### 2. Edit Profile & Avatars (`edit.controller.ts`)
- Allows partial updates to the user profile (e.g., `name`).
- **Cloudinary Integration**: Fully supports `multipart/form-data` uploads. When `req.file` is populated, the image is securely shipped to Cloudinary (`uploadImageToCloudinary`), bound to the user's ID/Timestamp, and the resulting URL updates the user's `avatar` property natively.
- Cleans up ephemeral local upload files utilizing Node `fs.unlinkSync` post-upload.

### 3. Soft Deletion (`delete.controller.ts`)
- Adopts a "Soft Delete" pattern rather than wiping data permanently.
- Queries the database for the active user context natively attached by the auth guard.
- Flags the `status` as `DELETED` (from `EUserStatus`). Maintaining referential integrity for related databases.

## 🛡️ Profile Guard (`profile.guard.ts`)
The `profile.guard.ts` intercepts all protected `/user` routes. It is responsible for:
1. Extracting the PASETO token from the headers (`Bearer ...`) or strict HTTP-only cookies (`__ESAA`).
2. Validating PASETO signatures natively via node core `crypto` and the PASETO standard.
3. **Caching**: Introduces a high-performance in-memory cache step (`local-cache.core`). If the decrypted PASETO payload matches a cached user, it skips a MongoDB round-trip.
4. If not heavily cached, fetches from MongoDB, omitting sensitive payload details (password blocklist), resets the cache, and forwards to `req.user`.

## 🗄️ Mongoose Schema Features (`User.schema.ts`)
- **Auto-generated fields**: Automates UUID-based IDs natively and sets initial `status` / `role` variables.
- **Pre-save hook**: 
  - Monitors `password` changes and injects `bcryptjs` crypt-hashing lazily.
  - Automatically compounds dynamic, friendly UUID `username` slugs based on the user's sanitized name string.
- **Methods**: Houses domain-specific helper methods such as `comparePassword`.

## 📊 Sequence Diagram
Curious about the flow layout? View the [Sequence Diagram](sequence_diagram.md) mapping out requests and database hops.
