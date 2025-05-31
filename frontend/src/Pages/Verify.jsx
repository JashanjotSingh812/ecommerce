// import React, { useContext, useEffect } from 'react'
// import { ShopContext } from '../Context/ShopContext'
// import { assets } from '../assets/assets'
// import { useSearchParams } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import axios from 'axios'
// const Verify = () => {

//   const {navigate,token,setCartItems,backendUrl}=useContext(ShopContext) 
//   const[searchParams,setsearchParams]=useSearchParams();

//   const success=searchParams.get('success')
//   const orderId=searchParams.get('orderId')
//   const verifyPayment=async()=>{
//        try {
//           if(!token){
//             return null;
//           }

//           const response=await axios.post(backendUrl+'/api/order/verifyStripe',{success,orderId},{headers:{token}})
//           if(response.data.success){
//             setCartItems({});
//             navigate('/orders')
//           }else{
//             navigate('/cart')
//           }
//        } catch (error) {
//           console.log(error);
//           toast.error(error.message);
//        }
//   }

//   useEffect(() => {
//     verifyPayment()
//   }, [token])
  
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Verify


import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const verifyPayment = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success, orderId},
        {
          headers: {
            Authorization: `Bearer ${token}`,  // ✅ send token in Authorization header
          },
        }
      );

      if (response.data.success) {
        setCartItems({});
        navigate('/orders');
      } else {
        navigate('/cart');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Payment verification failed");
    }
  };

  useEffect(() => {
    verifyPayment();  // ✅ call the function
  }, [token]);

  return <div></div>;
};

export default Verify;
