# Campus Notifications 

Backend service for the evaluation.

## What it does

- starts an Express server
- keeps notifications in SQLite
- sends logs to the evaluation service
- checks errors and bad input

## How to run

```bash
npm install
npm start
```

## Check the app

```bash
npm run check
```

## Main routes

- `GET /health`
- `GET /info`
- `GET /notifications`
- `GET /notifications/:id`
- `POST /notifications`
- `PUT /notifications/:id`
- `DELETE /notifications/:id`

## Small note

- I used `.env` for values like the auth token.
- The SQLite file is `notification_app.db`.