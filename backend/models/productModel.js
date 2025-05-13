import { DataTypes } from "sequelize";
import sequelize from "../config/mysql.js";

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subCategory: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bestseller: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  sizes: {
    type: DataTypes.JSON, 
    allowNull: true,
  },
  image: {
    type: DataTypes.JSON, 
    allowNull: true,
  },
});

export default Product;


// import mongoose from "mongoose";

// const productSchema=new mongoose.Schema({
//     name:{type:String, required:true},
//     description:{type:String, required:true},
//     price:{type:Number, required:true},
//     image:{type:Array,required:true},
//     category:{type:String, required:true},
//     subCategory:{type:String, required:true},
//     sizes:{type:Array,required:true},
//     bestseller: {type:Boolean},
//     date:{type:Number,required:true}
// })

// const productModel=mongoose.models.product || mongoose.model("product",productSchema)

// export default productModel
