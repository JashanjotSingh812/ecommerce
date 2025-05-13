import { DataTypes } from "sequelize";
import sequelize from "../config/mysql.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;


// import mongoose  from "mongoose";

// const userSchema= new mongoose.Schema({
//     name:{type:String,required:true},
//     email:{type:String,required:true, unique:true},
//     password:{type:String,required:true},
//     cartData:{type:Object, default:{}}
// },{minimize:false})

// const userModel=mongoose.model.user || mongoose.model('user',userSchema);

// export default userModel;