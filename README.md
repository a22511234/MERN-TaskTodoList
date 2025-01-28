# **Task Management System**

## **Project Overview**
This is a task management system built with Fastify and MongoDB, designed for collaboration among class leaders, instructors, and students. The project supports role-based access control and notification features to ensure timely updates of task-related information.

---

## **Features**

### **Role-Based Access Control**
1. **Class Leader**:
   - Can create, edit, and delete tasks they own.
   - Can view all tasks, including those created by instructors.
2. **Instructor**:
   - Can create, edit, and delete tasks they own.
   - Can only view tasks they created.
3. **Student**:
   - Can view tasks assigned to them.
   - Receive real-time notifications for task creation, updates, or deletions.
   - Can update task status (“not_started”, “in_progress”, or “completed”).

### **Notification System**
- Notifications are sent to assigned students whenever a task is created, updated, or deleted.
- Task reminders can be customized (e.g., 4 hours or 1 hour before the due time).

### **Task Status Management**
- **For Class Leaders and Instructors**:
  - Task status is limited to “In Progress” or “Completed”.
- **For Students**:
  - Task statuses include “Not Started”, “In Progress”, and “Completed”.

### **Completion Check**
- When all assigned students complete a task, the system automatically marks the task as "Completed."

---

## **Tech Stack**
- **Backend Framework**: Fastify
- **Database**: MongoDB
- **Programming Language**: TypeScript

---

## **API Endpoints**

### **Task Routes**
| Method   | Path              | Description                     |
|----------|-------------------|---------------------------------|
| GET      | `/tasks`          | Get the list of all tasks       |
| POST     | `/tasks`          | Create a new task               |
| PUT      | `/tasks/:id`      | Update a task by ID             |
| DELETE   | `/tasks/:id`      | Delete a task by ID             |

### **Alert Routes**
| Method   | Path              | Description                     |
|----------|-------------------|---------------------------------|
| GET      | `/alerts`         | Get the list of alerts          |
| DELETE   | `/alerts`         | Delete all alerts               |

---

## **Getting Started**

### **Prerequisites**
- Node.js >= 16.x
- MongoDB >= 5.x

### **Installation**

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file and add the following:
     ```
     MONGO_URI=mongodb://localhost:27017/task_management
     PORT=3000
     ```

4. Start the server:
   ```bash
   npm run dev
   ```

5. Test the API by navigating to `http://localhost:3000`.
