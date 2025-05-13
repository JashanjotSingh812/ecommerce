import { DataTypes } from "sequelize";
import sequelize from "../config/mysql.js";

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  items: {
    type: DataTypes.JSON, // Use JSON to store array of items
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  address: {
    type: DataTypes.JSON, // JSON to store address object
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Order Placed",
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  payment: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default Order;




// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//     userId: { type: String, required: true },
//     items: { type: Array, required: true },
//     amount: { type: Number, required: true },
//     address: { type: Object, required: true},
//     status: { type: String, required: true, default: 'Order Placed' },
//     paymentMethod: { type: String, required: true },
//     payment: { type: Boolean, required: true, default: false},
//     date: { type: Date, required: true }
// })

// const orderModel = mongoose.models.order || mongoose.model('order', orderSchema)
// export default orderModel;


