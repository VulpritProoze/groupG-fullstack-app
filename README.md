# User Management System

A full-stack application for managing employee information, department details, tracking workflows, and equipment requests. The system includes features like user signup, authentication, role-based access control, and CRUD operations across various modules.

## Table of Contents
- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [Team Members](#team-members-and-assigned-tasks)
- [Installation](#installation)
- [Usage](#usage)
- [Remote PostgreSQL Access](#remote-postgresql-access)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

The **User Management System** is a web-based application designed to streamline organizational tasks by providing modules for:
- Employee management
- Department management
- Workflow tracking
- Equipment request handling

This project involves both frontend and backend development, along with comprehensive testing and deployment strategies.

---

## Project Overview

### Team Members and Assigned Tasks

#### 1. Benitez  
- **Role:** Frontend Developer  
- **Assigned Tasks:**  
  - Develop the frontend components for **department management** UI  
- **Assigned Branch:**  
  - `benitez_department` creating the frontend component for department management  

#### 2. Alin  
- **Role:** Project Manager/Full Stack Developer (Frontend & Backend)  
- **Assigned Tasks:**
  - Managing the team
  - CI/CD & DevOps
  - Work on **requests management** module (both frontend and backend)  
  - Set up the development environment  
  - Responsible for deploying the application  
- **Assigned Branches:**  
  - `main` creating the frontend and backend components for requests management  

#### 3. Licanda  
- **Role:** Tester  
- **Assigned Tasks:**  
  - Perform functional and security testing on the system  
  - Manage testing for **workflow management** functionality
  - Creating the workflows management functionality 
- **Assigned Branches:**  
  - `licanda_workflows` initiates functional and security testing of the systems  

#### 4. Guinto  
- **Role:** Backend Developer  
- **Assigned Tasks:**  
  - Focus on the backend, developing **employee management** services  
- **Assigned Branch:**  
  - `guinto_employee` creating the backend component for employee management  

### Branch Information

| Member      | Branch Name                         | Assigned Task                        |
|-------------|-------------------------------------|--------------------------------------|
| Benitez     | `benitez_department`              | Frontend - Department Management     |
| Alin        | `main`    | Full Stack - Requests Management & Application Deployment |
| Licanda     | `licanda_workflows`             | Functional & Security Testing & Workflows Management        |
| Guinto      | `guinto_employee`  | Backend - Employee Management        |

---

## Installation

### For Development

#### Prerequisites
- [PostgreSQL](https://www.postgresql.org/download/) *(For local development/testing)*
- [Node.js](https://nodejs.org/) *(Latest LTS version)*
- IDE of your choice *(VS Code recommended)*

> ⚠️ **Note:** The production database uses PostgreSQL deployed via [Railway](https://railway.app/).

#### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/VulpritProoze/user-management-system.git
   cd user-management-system
   ```

2. **Install and Configure PostgreSQL**

    Follow these steps to install and configure PostgreSQL locally:

   1. **Download and install** PostgreSQL from the official website:  
      [https://www.postgresql.org/download/](https://www.postgresql.org/download/)

   2. **Add PostgreSQL to your system PATH**:  
      During or after installation, ensure the `PostgreSQL/bin` directory is added to your system’s environment variables so you can access PostgreSQL commands from any terminal.

   3. **Set and remember your password**:  
      You’ll be prompted to set a password for the default `postgres` user during installation. Keep this secure and accessible — you'll need it for configuration and database access.

   4. **Verify the PostgreSQL service is running**:  
      Use one of the following depending on your OS:

      - **Windows (Command Prompt)**:
        ```bash
        net start | findstr "PostgreSQL"
        ```

      - **macOS/Linux (Terminal)**:
        ```bash
        pg_isready
        ```
        or
        ```bash
        sudo systemctl status postgresql
        ```

   > ✅ **Tips:**
   > - If the service isn't running, use `pg_ctl start` or the installer GUI to start it.
   > - Consider using **pgAdmin** (included in the installer) for visual database management.

3. **Initialize the project**:
   - Open the project in your IDE
   - Install dependencies:
     ```bash
     npm install
     ```

### For Production

There's no need to install anything locally. The application is already deployed and ready to use.

🔗 **Access the production site at:**  
[https://group-g-fullstack-app.vercel.app](https://group-g-fullstack-app.vercel.app)

This deployment includes all necessary backend services and is connected to a live PostgreSQL instance via Railway.



---

## Usage

### For Development

1. Database Setup (Local Development)
  
    Start by setting up your local PostgreSQL database:

    #### a. Open a terminal or shell (Command Prompt, PowerShell, Terminal, etc.)
    
    Make sure PostgreSQL is running before continuing.
    
    - On **Windows**, you can use:
      ```bash
      net start | findstr "PostgreSQL"
      ```
    
    - On **macOS/Linux**, run:
      ```bash
      pg_isready
      ```
    
    If not running, start the service using your OS method or via `pg_ctl`.
  
    #### b. Connect to the PostgreSQL database
    
    Open a PostgreSQL interactive terminal:
    
    ```bash
    psql -U postgres -h localhost -p 5432
    ```
    
    You’ll be prompted for the password you set during installation.
    
    > 💡 If you're logging in without a password prompt, you might be authenticated via peer/trust method — try switching to the correct system user or adjust `pg_hba.conf` if needed.
    
    #### c. Create a new database for the project (if not already created)
    
    ```sql
    CREATE DATABASE user_management_db;
    ```
    
    Then connect to it:
    
    ```sql
    \c user_management_db
    ```
    
    #### d. Update `config.json` with your database credentials
    
    ```json
    "database": {
        "host": "localhost",
        "port": 5432,
        "user": "postgres",
        "password": "[SET PostgreSQL Password here]",
        "database": "user_management_db"
    }
    ```

    ### e. 🧪 Example Usage: Working with Real Table Structures
    
    Now that you're connected, let’s explore some of the core tables and run example queries similar to those used in production.
    
    ### 🔹 1. View all accounts
    
    ```sql
    SELECT id, email, firstName, lastName, role, status FROM accounts;
    ```
    
    ### 🔹 2. Insert a test account
    
    ```sql
    INSERT INTO accounts (
        email, passwordHash, title, firstName, lastName, role, status, created
    ) VALUES (
        'test@example.com',
        '$2a$10$dummyhashstring', -- placeholder hash
        'Mr.',
        'John',
        'Doe',
        'user',
        'active',
        NOW()
    );
    ```
    
    ### 🔹 3. Add a department
    
    ```sql
    INSERT INTO departments (name, description, created)
    VALUES ('Engineering', 'Core development team', NOW());
    ```
  
    ### 🔹 4. Register an employee linked to an account
    
    ```sql
    INSERT INTO employees (
        employeeId, position, hireDate, status, userId, departmentId, created
    ) VALUES (
        'EMP-001',
        'Software Engineer',
        '2024-01-15',
        'active',
        1, -- ID from accounts table
        1, -- ID from departments table
        NOW()
    );
    ```
    
    ### 🔹 5. View all active employees
    
    ```sql
    SELECT id, employeeId, position, hireDate
    FROM employees
    WHERE status = 'active';
    ```
    
    ### 🔹 6. Delete a request by ID (simulate cleanup)
    
    ```sql
    DELETE FROM requests WHERE id = 5;
    ```
    
    ### 🔹 7. List all tables (for reference)
    
    ```sql
    \dt
    ```
    
    Available tables:
    - `accounts`
    - `refreshTokens`
    - `departments`
    - `employees`
    - `requests`
    - `workflows`


#### 2. Email Configuration (Development)

Use [Ethereal.email](https://ethereal.email/) — a fake SMTP service for testing emails in development.

- Go to [https://ethereal.email/](https://ethereal.email/)
- Sign up or use the generator to get a temporary email account.
- Use the provided credentials in your config file:

```json
"smtpOptions": {
    "host": "smtp.ethereal.email",
    "port": 587,
    "secure": false,
    "auth": {
        "user": "ethereal_email@example.com",
        "pass": "ethereal_password"
    },
    "from": "User Management System <no-reply@usermgmt.dev>"
}
```

> 📝 Ethereal will provide a test inbox link where you can view sent emails.


#### 3. Application Startup

- In the root directory, install dependencies:
```bash
npm install
```

- Start the backend server:
```bash
npm run dev:backend
```

- Open a new terminal window and start the frontend:
```bash
npm run start:frontend
```


#### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:4200
```

Test features such as:
- Employee registration and management
- Department creation and assignment
- Request submission and approval workflow
- Admin dashboard (if logged in as admin)


### For Production

No local installation is required. The app is deployed online and ready to use.

🔗 **Access the live site at:**  
[https://group-g-fullstack-app.vercel.app](https://group-g-fullstack-app.vercel.app)

#### 1. Registering an Account
- After registering, check your email for a verification link.
- Make sure to use a valid email address to receive verification instructions.

#### 2. <a id="remote-postgresql-access"></a>Accessing PostgreSQL Database Remotely

You can connect to the remote PostgreSQL database via the following command:

```bash
PGPASSWORD=VGDhHJwdooFcgecDVbRBucHjAvcpNkVJ psql -h switchback.proxy.rlwy.net -U postgres -p 36186 -d railway
Password: VGDhHJwdooFcgecDVbRBucHjAvcpNkVJ
```

  ### Common PostgreSQL Commands
  
  After connecting, try these commands:
  
  #### List tables
  ```sql
  \dt
  ```
  
  Available tables:
  - `accounts`
  - `refreshTokens`
  - `departments`
  - `employees`
  - `requests`
  - `workflows`
  
  ### Basic SQL Queries
  
  #### View all users
  ```sql
  SELECT id, email, firstName, lastName, role FROM accounts;
  ```
  
  #### Add a new department
  ```sql
  INSERT INTO departments (name, description, created)
  VALUES ('Engineering', 'Core development team', NOW());
  ```
  
  #### Update employee department
  ```sql
  UPDATE employees SET departmentId = 1 WHERE id = 1;
  ```
  
  #### Delete a request by ID
  ```sql
  DELETE FROM requests WHERE id = 5;
  ```
  
  #### Get all active employees
  ```sql
  SELECT * FROM employees WHERE status = 'active';
  ```

---

## Deployment

| Component   | Platform       | URL (if applicable) |
|------------|----------------|---------------------|
| Database   | Railway PostgreSQL | Auto-managed via Railway |
| Frontend   | Vercel          | [Live App](https://group-g-fullstack-app.vercel.app) |
| Backend    | Railway Node Server | [API Endpoint](https://groupg-fullstack-app-production.up.railway.app) |

---

## Testing

1. Functional testing results: [Link to test cases](https://docs.google.com/document/d/1pcmrpNUKAuFbz8pSlUhtA2zy5qdsb3n7I16VfU7aSDE/edit?usp=sharing)
2. Security testing results: [Link to test cases](https://docs.google.com/document/d/1iQvH2xut2616lbC8bNOF09OteJSJdZVrydNADv0-Zb4/edit?usp=sharing)

---

## Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started
1. Fork the repository.
2. Clone your fork locally.
   ```
   git clone https://github.com/your-username/user-management-system.git  
   ```
3. Set up the development environment (see [Installation section](#installation))

### Workflow
1. Create a new branch for your feature/fix:
   ```
   git checkout -b feat/your-feature-name
   ```
   or
   ```
   git checkout -b fix/issue-description
   ```
2. Make your changes following the project's coding standards
3. Commit your changes with a descriptive message:
   ```
   git commit -m "feat: add user profile editing capability"
   ```

### Pull Requests
1. Push your branch to your fork:
   ```
   git push origin your-branch-name
   ```
2. Open a Pull Request against the `main` branch
3. Include in your PR description:
   - Purpose of the changes
   - Screenshots if applicable
   - Any relevant test results

### Guidelines
- Follow existing code style and patterns
- Write clear commit messages using Conventional Commits format:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation changes
  - `chore:` for maintenance tasks
- Keep PRs focused on a single purpose
- Update documentation when adding new features

### Reporting Issues
When opening an issue, please include:
- Detailed description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser/OS version if relevant

---

## License

MIT License

<div align="justify">
Copyright (c) 2025, University of Cebu - Main

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</div>
