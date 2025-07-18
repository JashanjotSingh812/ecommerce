# 🛍️ MERN Stack E-commerce Website (with MySQL)

A fully-featured e-commerce web application built using the MERN stack (MySQL, Express.js, React.js, Node.js). This project includes features such as user authentication, product management, shopping cart, order placement, and multiple payment methods including Razorpay, Stripe, and Cash on Delivery.

---

## 🚀 Features

### 👤 User Features
- User Registration and Login (with JWT)
- Product browsing with categories and search
- Add to Cart and Remove from Cart
- Place Orders with multiple payment options (Razorpay, Stripe, COD)
- View Order History
- Responsive Design

### 🛠️ Admin Features
- Admin Login
- Add, Edit, Delete Products
- View All Orders
- Manage Inventory

---

## 🧰 Tech Stack

### Frontend:
- React.js
- Axios
- Redux (for state management)
- Tailwind CSS / Bootstrap / CSS

### Backend:
- Node.js
- Express.js
- MySQL (via Sequelize ORM)
- JWT for Authentication
- Multer (File Upload)
- Cloudinary (Image Hosting)

### Payments:
- Razorpay Integration
- Stripe Integration
- Cash on Delivery

---

## 📁 Folder Structure

project-root/
├── client/ # React Frontend
│ └── src/
│ └── components/
│ └── pages/
│ └── redux/
│ └── App.js
│ └── index.js
├── server/ # Node.js Backend
│ └── controllers/
│ └── models/ # Sequelize models
│ └── routes/
│ └── middleware/
│ └── config/ # DB and Cloudinary config
│ └── server.js


---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
https://github.com/JashanjotSingh812/ecommerce
cd backend
2. Setup Backend (Node + Express + MySQL)
bash
Copy
Edit
cd server
npm install
Create .env file inside /server:
env
Copy
Edit
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ecommerce
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
Setup MySQL Database
sql
Copy
Edit
CREATE DATABASE ecommerce;
The Sequelize models will sync automatically when the server starts.

bash
Copy
Edit
npm run dev
3. Setup Frontend (React)
bash
Copy
Edit
cd ../client
npm install
npm start
🔐 API Endpoints Overview
Auth Routes
POST /api/user/register – Register user

POST /api/user/login – Login user

Product Routes
GET /api/products – Fetch all products

POST /api/products – Add product (Admin)

PUT /api/products/:id – Update product (Admin)

DELETE /api/products/:id – Delete product (Admin)

Cart Routes
POST /api/cart/add – Add to cart

GET /api/cart – View cart

DELETE /api/cart/:id – Remove item from cart

Order Routes
POST /api/orders – Place an order

GET /api/orders/:id – View order details

GET /api/user/orders – View user’s order history

🖼️ Screenshots
![Image alt](<img width="1913" height="833" alt="image" src="https://github.com/user-attachments/assets/859a3f3a-1878-43f6-a0ff-90e9e59efe85" />
)


🛡️ Security Measures
Passwords hashed using bcrypt

JWT-based authentication and route protection

Role-based access control (Admin/User)

CORS and input sanitization

📌 Future Improvements
Product reviews and ratings

Wishlist feature

Email notifications

Coupon system

Admin dashboard with charts and analytics



