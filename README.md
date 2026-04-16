# 🍽️ FoodWeb - Meal Planning Web Application

FoodWeb is a full-stack meal planning web application that helps users browse recipes, manage meal plans, and track cooking history.  
The system allows users to organize daily meals, save favorite foods, and monitor their cooking behavior.

---

# 📸 Screenshots

## 🏠 Home Page
![Home Page](docs/images/home.png)

## 📅 Meal Plan Page
![Meal Plan](docs/images/meal-plan.png)

## 🍲 Food Detail Page
![Food Detail](docs/images/food.png)

---

# 🚀 Features

## 👤 User Features
- User authentication
- View personal profile
- Update profile information
- Save favorite foods
- Track food interaction history

## 🍽️ Food Management
- Browse food list
- View detailed food information
- Search foods by name
- Filter foods by category
- Pagination support

## 📅 Meal Planning
- Create daily meal plans
- Add foods to meal plans
- Organize meals by:
  - Breakfast
  - Lunch
  - Dinner
- Update or remove meal items
- Automatic history tracking when meals are added

## ❤️ Favorites
- Add foods to favorites
- Remove foods from favorites
- View favorite food list

## 📊 Food History Tracking
- Automatically record:
  - Cooked foods
  - Liked foods
  - Skipped foods
- Store user behavior for future recommendations

---

# 🛠️ Tech Stack

## Frontend
- ReactJS
- Redux Toolkit
- React Router
- CSS
- Axios

## Backend
- Java
- Spring Boot
- Spring Data JPA
- RESTful APIs

## Database
- MySQL

## Tools
- Git & GitHub
- Postman
- VS Code
- IntelliJ IDEA

---

# 🏗️ System Architecture

Frontend (ReactJS) communicates with Backend (Spring Boot) through RESTful APIs.  
Backend processes business logic and interacts with MySQL database.

---

# 🗄️ Database Design

Main tables:

- users
- foods
- ingredients
- food_ingredients
- meal_plans
- meal_plan_items
- favorite_foods
- user_food_history
- user_preferences

Key relationships:

- One user → many meal plans  
- One meal plan → many meal items  
- Foods ↔ Ingredients (Many-to-Many)  
- Users ↔ Favorite Foods (Many-to-Many)

---

# 🔌 API Overview

## Meal Plan APIs

### Get Meal Plan by Date
GET /api/meal-plans?date=YYYY-MM-DD


### Add Meal Item


POST /api/meal-plans

Body:
{
"foodId": 1,
"date": "2026-04-15",
"mealType": "Breakfast",
"note": "Healthy meal"
}


### Update Meal Item


PUT /api/meal-plans/{itemId}


### Delete Meal Item


DELETE /api/meal-plans/{itemId}


---

## Food APIs

### Get All Foods


GET /api/foods


### Get Food Detail


GET /api/foods/{id}


### Search Food


GET /api/foods/search?keyword=chicken


---

## Favorite APIs


POST /api/favorites/{foodId}

DELETE /api/favorites/{foodId}

GET /api/favorites


---

# 📂 Project Structure

## Backend (Spring Boot)


foodweb_be
│
├── controller
├── service
├── repository
├── entity
├── dto
├── enums
└── config


## Frontend (ReactJS)


foodweb_fe
│
├── src
│ ├── features
│ │ ├── food
│ │ ├── meal
│ │ ├── favorite
│ │ └── history
│ │
│ ├── components
│ ├── pages
│ └── store


---

# ⚙️ Installation Guide

## Backend Setup

```bash
cd foodweb_be

mvn clean install

mvn spring-boot:run

Backend runs at:

http://localhost:8080
Frontend Setup
cd foodweb_fe

npm install

npm run dev

Frontend runs at:

http://localhost:5173
📊 Key Highlights
Designed relational database schema with multiple relationships
Implemented RESTful APIs using Spring Boot
Built dynamic UI using ReactJS and Redux Toolkit
Implemented automatic food history tracking when users add meals to meal plans
Developed reusable components for scalability
Integrated meal scheduling system
🔮 Future Improvements
Food recommendation system
Nutrition tracking (calories)
Weekly meal plan view
Admin dashboard
AI-based meal suggestion
👩‍💻 Author

Pham Thi Phuong Uyen

📧 Email: puyen274@gmail.com

💻 GitHub: https://github.com/phuyen27