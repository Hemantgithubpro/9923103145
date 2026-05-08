# Affordmed Campus Evaluation - Backend System Design

## Stage 1 - Setup and Environment

In Stage 1, I set up the backend using Node.js and Express.

I made folders like `config`, `routes`, `middleware`, `utils`, `db`, and `repositories` so code stays organized.

I used `.env` for environment values and connected it in `config/config.js`.

I also added basic endpoints (`/health`, `/info`) to check if the server is running.

Outcome:
- Working backend skeleton
- Standardized project structure
- Environment-driven configuration
- Service health visibility

## Stage 2 - API Development

In Stage 2, I created notification APIs using REST style.

I added CRUD routes:

- `GET /notifications`
- `GET /notifications/:id`
- `POST /notifications`
- `PUT /notifications/:id`
- `DELETE /notifications/:id`

All APIs return data in a similar JSON format (`status`, `message`, `data`) so it is easy to use from frontend.

I tested the APIs with real requests to make sure they work.

Outcome:
- Complete notification CRUD surface
- Predictable API response format
- Verified endpoint functionality

## Stage 3 - Database Integration

In Stage 3, I moved from temporary in-memory data to SQLite database storage.

I added database setup in `db/database.js` and database logic in `repositories/notificationRepository.js`.

Now notifications are saved permanently, and CRUD works through database queries.

I also added seed data for initial records.

Outcome:
- Persistent notification storage
- Separation of route logic and data access
- Database-backed CRUD operations

## Stage 4 - Logging Middleware

In Stage 4, I added proper logging middleware with reusable functions:

- `Log(stack, level, package, message)`
- `LogWithAuth(stack, level, package, message, token)`

At server startup, backend gets auth token from evaluation auth API.

Token is cleaned and used to send logs to the evaluation log API.

I added request logging (method, path, status code, time taken) and error logging middleware.

Outcome:
- Unified request and error observability
- Authenticated logging integration with evaluation service
- Reusable logging primitives across the backend

## Stage 5 - Error Handling and Validation

In Stage 5, I focused on input validation and better error handling:

- Custom HTTP error utility (`HttpError`) with controlled status codes
- Validation middleware for notification payloads
- Consistent handling for bad input (`400`) and missing resources (`404`)
- Centralized global error handler in `server.js`

Validation checks required fields and allowed values (like `audience` and `status`).

For update APIs, partial updates are still supported.

Outcome:
- Cleaner and safer request processing
- Standardized error responses
- Reduced risk of malformed data entering persistence

## Stage 6 - Final Integration and Submission Readiness

In Stage 6, I connected everything and prepared final submission.

I finalized scripts (`start`, `dev`, `check`) and updated documentation.

A final smoke test confirmed that:

- Server boots successfully
- Health endpoint responds correctly
- Notification APIs work with database persistence
- Logging middleware remains active during request flow

Outcome:
- End-to-end integrated backend
- Submission-ready documentation and run steps
- Verified runtime behavior across core flows

## Final Summary

Overall, this project started from a basic backend setup and became a complete modular backend with database, APIs, logging, and validation.

I completed all stages step by step and checked each stage with runtime testing.

The backend is now stable and ready for submission.
