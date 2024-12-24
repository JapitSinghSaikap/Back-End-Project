# Back-End-Project

## Project Description
This project is designed to allow user registration and display registered users in a table format. It includes the following components:

- **Backend:** Handles API endpoints for user registration and retrieval of User Data on new page.
- **React Frontend:** User interaction using React and Vite.

## Folder Structure

```
backend-project
|--Project
|   |Backend
|   |     |-- (Backend server files)
|   |
|   |React_frontend (Register)
|   |     |-- (React + Vite frontend files)
```

---


## Features

1. **User Registration:**
   - Register users by providing their name, email, gender and password.
2. **Display Users:**
   - View all registered users in a table format on the frontend.

---

## API Endpoints

### Backend API

- **POST /register**: Register a new user
  ```json
  {
    "name": "string",
    "username": "string",
    "password": "string"
  }
  ```

- **GET /users**: Retrieve the list of all registered users

-**DELETE /users/email**: Deletes the user from the frontend of the registered users

---
