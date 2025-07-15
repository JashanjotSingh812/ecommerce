# 🛍️ MERN Stack E-commerce Website

A fully-featured e-commerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The website supports user authentication, product management, shopping cart, order placement, and multiple payment methods including Razorpay, Stripe, and Cash on Delivery.

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
- MongoDB (with Mongoose)
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
│ └── models/
│ └── routes/
│ └── middleware/
│ └── config/
│ └── server.js

yaml
Copy
Edit

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mern-ecommerce.git
cd mern-ecommerce
2. Setup Backend
bash
Copy
Edit
cd server
npm install
Create a .env file inside /server directory:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
Then start the server:

bash
Copy
Edit
npm run dev
3. Setup Frontend
bash
Copy
Edit
cd ../client
npm install
npm start
Your frontend will run at http://localhost:3000 and backend at http://localhost:5000.

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
Add screenshots of your homepage, product page, cart, and admin panel here.

🛡️ Security Measures
Passwords hashed using bcrypt

JWT for route protection

Admin-only access control

CORS enabled for secure API calls

📌 Future Improvements
Product reviews and ratings

Wishlist feature

Order cancellation/refund system

Email notifications

Admin dashboard with analytics

👨‍💻 Author
Jashanjot Singh
GitHub: https://github.com/yourusername
LinkedIn: https://linkedin.com/in/yourprofile

