# Servexa

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### IT Service Management Platform

Servexa is a full-stack IT service management platform designed to simplify the process of requesting, managing, and tracking technical services.

The platform provides separate experiences for clients and administrators. Clients can browse available services, submit service requests, monitor order progress, and manage their accounts. Administrators can manage users, services, orders, pricing, and service statuses through a dedicated dashboard.

```markdown
## Key Technical Highlights

- GraphQL API with Apollo Server
- MongoDB data persistence using Mongoose
- JWT-based authentication
- Role-based authorization
- React-based client application
- Redux Toolkit for global state management
- Apollo Client for GraphQL data fetching
- Responsive Bootstrap/CSS layouts
- CRUD-based service and order management
- Dashboard analytics and data aggregation
- Search, filtering, and pagination
- Relative-time activity feed
```

> **Servexa is a portfolio project built to demonstrate full-stack web development, authentication, GraphQL APIs, database management, responsive UI design, and state management.**

## Link to Webpage

Click [here](https://agile-citadel-78208-01d98a19faad.herokuapp.com/) to view the web app.

## ✨ Features

### Client Features

- User registration and authentication
- Secure login/logout functionality
- Browse available IT services
- Submit service requests
- View personal orders
- Track order status
- View order details
- View pricing and service information
- Update personal information
- Change account password
- Responsive user dashboard
- Paginated order tables

### Administrator Features

- Dedicated administrator dashboard
- User management
- View and manage client accounts
- Approve or de-list users
- Service management
- Create and update services
- Order management
- Update order statuses
- Set order pricing
- Add administrator notes
- View recent orders
- Dashboard statistics
- Activity feed
- Search and filter users
- Paginated tables

### Dashboard Features

The administrator dashboard provides an overview of important platform activity, including:

- Active users
- Total orders
- Pending orders
- Total revenue
- Monthly performance comparisons
- Recent orders
- Recent administrative activity

## 🛠️ Tech Stack

### Frontend

- React
- React Router
- Redux Toolkit
- Apollo Client
- Bootstrap
- CSS
- JavaScript

### Backend

- Node.js
- Express.js
- Apollo Server
- GraphQL
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt

### Development & Testing

- Create React App
- Git / GitHub
- GraphQL API testing
- Component and application testing

## 🏗️ Application Architecture

Servexa follows a client-server architecture.

```text
                    ┌─────────────────────┐
                    │      Servexa        │
                    │     Frontend        │
                    │       React         │
                    └──────────┬──────────┘
                               │
                               │ GraphQL
                               ▼
                    ┌─────────────────────┐
                    │      Backend        │
                    │  Node / Express /    │
                    │    Apollo Server     │
                    └──────────┬──────────┘
                               │
                               │ Mongoose
                               ▼
                    ┌─────────────────────┐
                    │      MongoDB        │
                    │      Database       │
                    └─────────────────────┘
```

## 🔐 Authentication & Authorization

Servexa uses JSON Web Tokens (JWT) for authentication.

After successfully logging in, users receive an authentication token that is used to authorize protected requests.

The application supports role-based authorization:

                  User
                   │
          ┌────────┴────────┐
          │                 │
       Client             Admin
          │                 │
          ▼                 ▼
     Client Dashboard   Admin Dashboard

Administrators have access to management functionality that is restricted from regular clients.

## 📊 Order Management

Orders form the core workflow of the Servexa platform.

A typical service request follows a workflow similar to:

```text
Service Selection
       │
       ▼
Service Request
       │
       ▼
     Review
       │
       ▼
     Pricing
       │
       ▼
  Payment Pending
       │
       ▼
   In Progress
       │
       ▼
    Completed
       │
       ▼
     Closed
```

Administrators can update the status and pricing of orders through the administrator dashboard.

Clients can then view the updated information from their own dashboard.

## 👥 User Management

Administrators can manage users through the Users section of the admin dashboard.

Available functionality includes:

- View users
- Search users
- Filter users by status
- View individual user profiles
- View associated orders
- Update user status
- View number of orders
- View account creation date

Administrative users are excluded from the standard client listing.

## 🔧 Service Management

Administrators can create and manage the services offered through Servexa.

Each service can contain information such as:

- Service title
- Description
- Category
- Default price
- Service status
- Creation date
- Last updated date

Clients can browse available services and submit requests for the services they require.

## 📈 Dashboard Analytics

The administrator dashboard provides high-level metrics to help monitor platform activity.

Current metrics include:

- Active users
- Total orders
- Pending orders
- Total revenue

The dashboard also compares current monthly activity with the previous month to provide percentage changes in key metrics.

For example:

```
Active Users
     125
   ↑ 12.5%

Total Orders
     84
   ↓ 5.6%

Revenue
   $12,450
   ↑ 18.4%
```

## 📝 Activity Feed

The administrator dashboard includes an activity feed that records important administrative actions.

Examples include:

```
Order #A31F92 updated to "In Progress"
5 minutes ago

Order #92BC41 updated to "Closed"
23 minutes ago

User status updated to "Approved"
1 hour ago
```

The activity feed maintains a limited number of recent activities and provides relative timestamps.

## 📱Responsive Design

Servexa is designed to work across different screen sizes.

The interface uses responsive layouts for:

- Desktop
- Tablet
- Mobile

Tables use horizontal scrolling on smaller screens where necessary, allowing large datasets to remain usable without breaking the overall page layout.

## 📂 Project Structure

```
Servexa/
│
├── client/
│   ├── public/
│   │
│   └── src/
│       ├── Components/
│       ├── Pages/
│       ├── State/
│       ├── utils/
│       ├── App.js
│       └── index.js
│
├── server/
│   ├── models/
│   ├── schemas/
│   ├── resolvers/
│   ├── utils/
│   └── server.js
│
├── package.json
└── README.md
```

The exact structure may vary depending on the current implementation.

## Getting Started

### Prerequisites

Before running Servexa locally, make sure you have:

- Node.js installed
- npm installed
- MongoDB database
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/anayoifediora/Servexa
```

Navigate into the project:

```bash
cd Servexa
```

### 2. Install Dependencies

Install the server dependencies

```bash
npm install
```

Then install the client dependencies

```bash
cd client
npm install
```

### 3. Configure Environment Variables

Create a `.env` file for the server and provide the required configuration.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3001
```

Do not commit your `.env` file to GitHub.

### 4. Start the Application.

Start the backend:

```bash
npm run server
```

Start the React development server:

```Bash
npm start
```

The application should then be available through the local development URL configured by the project.

## 🔌 GraphQL API

Servexa uses GraphQL for communication between the frontend and backend.

Examples of available operations include:

### Queries

```
users
user
services
orders
order
recentOrders
orderResults
dashboardIndices
```

### Mutations

```
createUser
login
updateUserStatus
updatePassword
createService
updateService
createOrder
updateOrderStatus
updateUser
```

The GraphQL API handles data retrieval, mutations, authentication, authorization, and interaction with MongoDB.

## 🔮 Future Improvements

Potential future improvements include:

- Payment gateway integration
- Email notifications
- Client notifications
- Automated email communication.

## Project Goals

Servexa was developed as a practical full-stack project to explore and demonstrate:

- Building a REST/GraphQL-backed web application
- React application architecture
- GraphQL queries and mutations
- MongoDB data modelling
- Mongoose relationships and population
- Authentication and authorization
- Role-based access control
- Redux state management
- Responsive UI development
- CRUD operations
- Form handling and validation
- Error handling
- Dashboard analytics
- Application architecture

## 📸 Screenshots

### Landing Page

![Landing_Page](./client/public/images/Landing%20Page.png)

### Client Dashboard

![Client_Dashboard](./client/public/images/Client%20Dashboard.png)

### Admin Dashboard

![Admin_Dashboard](./client/public/images/Admin%20Dashboard.png)

### Order Details

![Order_Details](./client/public/images/Order%20Details.png)

## 📌 Project Status

Status: Active Development

Servexa is a portfoli project and is continually being improved as new functionality, testing and UI refinements are added.

## ✍️ Author

Kanayochi Ifediora

- [Email](anayoifediora@live.com)
- [GitHub Profile](https://github.com/anayoifediora)

## 📝 License

This project is licensed under the MIT License.

## 🙌 Acknowledgments

- Open-source libraries and tools used across the MERN ecosystem

- React, MongoDB, Apollo GraphQL & Redux communities

- UI inspiration from modern minimalist SaaS dashboard platforms
