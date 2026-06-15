# CRM Management System

A full-stack Customer Relationship Management (CRM) application built using **React.js**, **Spring Boot**, and **MySQL**. The system helps businesses efficiently manage customers, leads, and sales activities through a modern and responsive web interface.

## 🚀 Features

* Customer Management (Create, Read, Update, Delete)
* Lead Tracking and Management
* Responsive User Interface
* REST API Integration
* Real-Time Data Updates
* Form Validation
* Search and Filtering
* Secure Database Storage
* Scalable Full-Stack Architecture

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript (ES6+)
* HTML5
* CSS3
* Axios
* React Hooks

### Backend

* Java
* Spring Boot
* Spring MVC
* Spring Data JPA
* Hibernate

### Database

* MySQL

### Tools

* Git & GitHub
* Maven
* Postman
* VS Code / IntelliJ IDEA

## 📂 Project Structure

```text
crm-management-system/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── pom.xml
│
└── README.md
```

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/crm-management-system.git
cd crm-management-system
```

### Backend Setup (Spring Boot)

1. Navigate to backend folder

```bash
cd backend
```

2. Configure MySQL in `application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/crm_db
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

3. Run the application

```bash
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

### Frontend Setup (React)

1. Navigate to frontend folder

```bash
cd frontend
```

2. Install dependencies

```bash
npm install
```

3. Start the React application

```bash
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

## 🔄 System Architecture

```text
React Frontend
      │
      ▼
 REST APIs (Axios)
      │
      ▼
Spring Boot Backend
      │
      ▼
 MySQL Database
```

## 📸 Screenshots

Add screenshots of:

* Dashboard
* Customer List
* Add Customer Form
* Update Customer Page
* Lead Management Module

## 📚 What I Learned

* Building Full-Stack Applications
* React Component Architecture
* State Management with Hooks
* RESTful API Development
* Spring Boot Backend Development
* Database Integration using JPA/Hibernate
* Frontend-Backend Communication using Axios
* Git & GitHub Collaboration

## 🔮 Future Enhancements

* JWT Authentication & Authorization
* Role-Based Access Control
* Email Notifications
* Analytics Dashboard
* Customer Interaction History
* Docker Deployment
* Cloud Hosting (AWS/Azure)

## 👨‍💻 Author

**Sai Kumar**

B.Tech Student | Full Stack Developer

* Java & Spring Boot Developer
* React Developer
* Open Source Contributor
* Passionate about building scalable web applications

## ⭐ Support

If you found this project useful, please consider giving it a star on GitHub!

## 📄 License

This project is developed for learning, and portfolio purposes.
