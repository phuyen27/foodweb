# 🍽️ FoodWeb - AI-Powered Meal Planning Web Application

**FoodWeb** is a full-stack web application designed to help users plan meals, explore recipes, and receive **AI-powered meal suggestions** based on their preferences and food history.
The system allows users to organize daily meals, save favorite foods, and track their cooking habits to support intelligent recommendations.

---

## 🏠 Home Page

![Home Page](docs/images/home.png)

## 📅 Meal Plan Page

![Meal Plan](docs/images/meal-plan.png)

## 🍲 Food Detail Page

![Food Detail](docs/images/food.png)

---

# 🚀 Features

## 👤 User Features

* User authentication (login/register)
* View and update profile information
* Save favorite foods
* Track food interaction history

---

## 🍽️ Food Management

* Browse food list
* View detailed food information
* Search foods by name
* Filter foods by category
* Pagination support

---

## 📅 Meal Planning

* Create daily meal plans
* Add foods to meal plans
* Organize meals by **Breakfast, Lunch, and Dinner**
* Update or remove meal items
* Automatically track history when meals are added

---

## ❤️ Favorites

* Add foods to favorites
* Remove foods from favorites
* View favorite food list

---

## 📊 Food History Tracking

The system automatically records user interactions such as:

* Cooked foods
* Liked foods
* Skipped foods

These behaviors are stored to support **AI-based recommendations**.

---

# 🤖 AI Recommendation Feature

FoodWeb integrates **Artificial Intelligence** to generate smart meal suggestions based on user behavior and preferences.

### AI Capabilities

* Generate **personalized meal recommendations**
* Suggest meals based on:

  * Favorite foods
  * Cooking history
  * User preferences
  * Meal patterns
* Provide intelligent suggestions for daily meal planning

### AI Integration

The system connects to an **AI model API** to analyze user data and generate recommended meals dynamically.

Example workflow:

1. User interacts with foods (favorite, cook, skip)
2. System records history
3. AI analyzes user patterns
4. Recommended meals are generated
5. Suggestions appear in the Meal Planning page

---

# 🛠️ Tech Stack

## Frontend

* ReactJS
* Redux Toolkit
* React Router
* Axios
* CSS

## Backend

* Java
* Spring Boot
* Spring Data JPA
* RESTful APIs

## Database

* MySQL

## AI Integration

* Gemini API (Google Generative AI)
* Prompt-based recommendation logic
* User behavior analysis

## Tools

* Git & GitHub
* Postman
* VS Code
* IntelliJ IDEA

---

# 🏗️ System Architecture

The system follows a **full-stack architecture**:

Frontend (**ReactJS**) communicates with Backend (**Spring Boot**) through RESTful APIs.
The backend processes business logic, stores data in **MySQL**, and interacts with the **AI service** to generate meal recommendations.

```text
User → Frontend (React)
        ↓
Backend (Spring Boot API)
        ↓
Database (MySQL)
        ↓
AI Model API (Gemini)
        ↓
Return Suggested Meals
```

---

# 🗄️ Database Design

## Main Tables

users
foods
ingredients
food_ingredients
meal_plans
meal_plan_items
favorite_foods
user_food_history
user_preferences

## Key Relationships

* One user → many meal plans
* One meal plan → many meal items
* Foods ↔ Ingredients (Many-to-Many)
* Users ↔ Favorite Foods (Many-to-Many)

---

# 🔌 API Overview

## Meal Plan APIs

* GET `/api/meal-plans?date=YYYY-MM-DD`
* POST `/api/meal-plans`
* PUT `/api/meal-plans/{itemId}`
* DELETE `/api/meal-plans/{itemId}`

Example request body (POST):

```json
{
  "foodId": 1,
  "date": "2026-04-15",
  "mealType": "Breakfast",
  "note": "Healthy meal"
}
```

---

## Food APIs

* GET `/api/foods`
* GET `/api/foods/{id}`
* GET `/api/foods/search?keyword=chicken`

---

## Favorite APIs

* POST `/api/favorites/{foodId}`
* DELETE `/api/favorites/{foodId}`
* GET `/api/favorites`


---

# 📂 Project Structure

## Backend (Spring Boot)

```
foodweb_be/
├── controller
├── service
├── repository
├── entity
├── dto
├── enums
├── ai/
└── config
```

## Frontend (ReactJS)

```
foodweb_fe/
├── src/
│   ├── features/
│   │   ├── food/
│   │   ├── meal/
│   │   ├── favorite/
│   │   ├── history/
│   │   └── ai/
│   ├── components/
│   ├── pages/
│   └── store/
```

---

# ⚙️ Installation Guide

## Backend

```bash
cd foodweb_be
mvn clean install
mvn spring-boot:run
```

Runs at:

```
http://localhost:8080
```

---

## Frontend

```bash
cd foodweb_fe
npm install
npm run dev
```

Runs at:

```
http://localhost:5173
```

---

# 📊 Key Highlights

* Designed a relational database with complex relationships
* Built RESTful APIs using Spring Boot
* Developed a responsive UI using ReactJS and Redux Toolkit
* Implemented automatic user behavior tracking
* Integrated **AI-powered meal recommendation**
* Built reusable and scalable components
* Developed an intelligent meal planning workflow

---

# 🔮 Future Improvements

* Nutrition tracking (calories & macros)
* Weekly & monthly meal planning view
* Admin dashboard
* AI nutrition optimization
* Image-based food recognition

---

# 👩‍💻 Author

**Pham Thi Phuong Uyen**

📧 Email: [puyen274@gmail.com](mailto:puyen274@gmail.com)
🐙 GitHub: https://github.com/phuyen27
