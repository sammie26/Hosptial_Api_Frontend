# MediConnect: Hospital Management System

## System Interface
*(Drag and drop a screenshot of your Login Terminal and your Dashboard here when editing on GitHub)*

## Application Description
MediConnect is a comprehensive, role-based hospital management interface built with a high-tech "Noir" aesthetic. It features secure identity access, temporal schedule vectors (appointment booking), and dynamic staff directories. The system enforces strict Role-Based Access Control (RBAC) across three primary clearances:
*   **Admins:** Can register new staff, manage departments, override doctor profiles, and view master schedules.
*   **Doctors:** Can manage their assigned operational vectors (appointments) and view their professional dossier.
*   **Patients:** Can browse the directory, book new temporal vectors (appointments), and manage their portal.

## Prerequisites
Before you begin, ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v16 or higher)
* [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) 
* SQL Server (or SQL Server Express)

## Environment Setup

**Frontend:** Create a `.env` file in your frontend root directory and add your API URL:
\`\`\`env
VITE_API_BASE_URL=https://localhost:7001/api
\`\`\`

**Backend:** Ensure your `appsettings.json` in the backend directory contains the correct database connection string. Update `YOUR_SERVER` to match your local SQL Server instance:
\`\`\`json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER;Database=MediConnectDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
\`\`\`

## Setup Instructions

### Backend (.NET Core Web API)
1. Navigate to the backend project directory in your terminal.
2. Run the database migrations to build your schema:
   \`\`\`bash
   dotnet ef database update
   \`\`\`
3. Start the backend server:
   \`\`\`bash
   dotnet run
   \`\`\`
   *The API will typically run on `https://localhost:7001` or `http://localhost:5000`.*

### Frontend (React / Vite)
1. Open a new terminal and navigate to the frontend project directory.
2. Install all required node dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the Vite development server:
   \`\`\`bash
   npm run dev
   \`\`\`
   *The application will launch on `http://localhost:5173`.*

## Core API Routes

### Authentication Sector
*   `POST /auth/login` - Authenticates identity and returns a JWT.
*   `POST /auth/register` - Registers a new user (Admin clearance required for staff roles).

### Medical Officers (Doctors) Sector
*   `GET /doctors` - Retrieves the directory of all medical officers.
*   `GET /doctors/{id}` - Retrieves a specific doctor's dossier.
*   `PUT /doctors/{id}` - Admin override to update doctor information.

### Temporal Vectors (Appointments) Sector
*   `GET /appointments` - Retrieves schedule vectors based on the user's role (Patient's own, Doctor's own, or Admin master list).
*   `POST /appointments` - Books a new appointment.
*   `DELETE /appointments/{id}` - Cancels a specific appointment.

### Departments Sector
*   `GET /departments` - Synchronizes available hospital sectors for registration and categorization.