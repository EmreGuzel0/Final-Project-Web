# 🛒 Full-Stack E-Commerce Application

This is a complete E-Commerce web application developed as a final project for the **Web Design and Programming** course.

## 📂 PROJECT ARCHITECTURE

### 1. Frontend Structure (`/frontend`)
The React application follows a professional component-based architecture:
* `src/components`: Reusable UI elements (Navbar, ProductCard, CartItem, etc.).
* `src/pages`: Main application views (Home, Login, Cart, AdminDashboard).
* `src/services`: **API integration layer** handling backend communication.
* `src/auth`: Security and route protection logic.

### 2. Database Schema (`/database`)
The project utilizes a relational database with 5 interconnected tables:
1.  **Users** (Authentication & Profile)
2.  **Products** (Inventory & Details)
3.  **Orders** (Order Records)
4.  **Reviews** (Product Ratings)
5.  **Contact_Messages** (Admin Messages)

### 3. Backend Structure (`/backend`)
* Built with **Java Spring Boot**.
* Follows MVC architecture (Controller, Service, Repository layers).

## 🚀 Technologies
* **Frontend:** React.js, Material UI
* **Backend:** Java Spring Boot
* **Database:** PostgreSQL
* **Tools:** VS Code, IntelliJ IDEA

## ⚙️ INSTALLATION GUIDE (Follow in Order)

### 1️⃣ STEP 1: Database 
* Open your PostgreSQL interface (pgAdmin or similar).
* Create a database.
* Run **ALL SQL files** located in the `database` folder to create the tables.

### 2️⃣ STEP 2: Backend 
* Open the `backend` folder in **IntelliJ IDEA**.
* Wait for Maven to download dependencies.
* Run the `Application.java` file.

### 3️⃣ STEP 3: Frontend 
* Open the `frontend` folder in a terminal (VS Code).
* Type `npm install` and press Enter (Wait for installation).
* Type `npm start` and press Enter.
* *Result:* The application will open at `http://localhost:3000`.

---

