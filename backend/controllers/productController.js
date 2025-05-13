import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/productModel.js';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET_KEY 
});

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ success: false, message: "No images uploaded" });
    }

    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    const imagesUrl = await Promise.all(
      images.map(async (img) => {
        const result = await cloudinary.uploader.upload(img.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: parseFloat(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true",
      image: imagesUrl
    };

    const product = await Product.create(productData);
    res.json({ success: true, message: "Product Added", product });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    await Product.destroy({ where: { id } });
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findByPk(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { listProducts, addProduct, removeProduct, singleProduct };








// import {v2 as cloudinary} from 'cloudinary';
// import productModel from '../models/productModel.js';

// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_SECRET_KEY
//   });
  

// // function for add product
// const addProduct = async (req, res) => {
//     try {
//         const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

//         // ✅ Ensure req.files exists
//         if (!req.files || Object.keys(req.files).length === 0) {
//             return res.status(400).json({ success: false, message: "No images uploaded" });
//         }

//         // ✅ Extract images safely
//         const image1 = req.files.image1?.[0];
//         const image2 = req.files.image2?.[0];
//         const image3 = req.files.image3?.[0];
//         const image4 = req.files.image4?.[0];

//         const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

//         // ✅ Upload images to Cloudinary
//         let imagesUrl = await Promise.all(
//             images.map(async (item) => {
//                 let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'});
//                 return result.secure_url;
//             })
//         );

//         // ✅ Create product data object
//         const productData = {
//             name,
//             description,
//             price: Number(price),
//             category,
//             subCategory,
//             sizes: JSON.parse(sizes),
//             bestseller: bestseller === "true" ? true:false,
//             image: imagesUrl,
//             date: Date.now(),
//         };

//         // ✅ Save product in DB
//         const product = new productModel(productData);
//         await product.save();
//         res.json({ success: true, message: "Product Added" });

//     } 
//     catch (error){
//         console.log(error);
//         res.json({success:false, message: error.message})
//     }
// }


// // function for list product
// const listProducts = async (req, res) => {
//     try{
//         const products = await productModel.find({});
//         res.json({success:true, products})
//     }
//     catch (error){
//         console.log(error);
//         res.json({success:false, message: error.message})
//     }
// }

// // function for remove product
// const removeProduct = async (req, res) => {
//     try {
//         await productModel.findByIdAndDelete(req.body.id)
//         res.json({ success: true, message: "Product removed"})
//     }
//     catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }

// // function for single product info
// const singleProduct = async (req, res) => {
//     try {
//         const { productId } = req.body
//         const product = await productModel.findById(productId)
//         res.json({success: true, product})
//     }
//     catch (error){
//         console.log(error)
//         res.json({success:false, message: error.message})
//     }
// }

// export { listProducts, addProduct, removeProduct, singleProduct }


