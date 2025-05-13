import { createContext, useEffect, useState } from "react"; 
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext(); 

const ShopContextProvider = (props) => { 
    // Configuration values
    const currency = '₹'; 
    const delivery_fee = 70; 
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log("Backend URL:", backendUrl);

    // State variables
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    // For debugging, token is initialized as an empty string.
    // **Make sure the token is stored in localStorage during login.**
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    // Debug: Log current state when token changes
    useEffect(() => {
        console.log("🔔 Token state updated:", token);
    }, [token]);

    // Function: Add an item to the cart
    const addToCart = async (itemId, size) => {
        console.log("📦 [addToCart] Attempting to add item, token:", token);
        if (!size) {
            toast.error('Select Product Size');
            return;
        }
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        // For debugging: Use token from state. 
        // If token is empty here, it means it's not set in localStorage.
        if (token) {
            try {
                console.log("📤 Sending addToCart API request with token:", token);
                const response = await axios.post(
                    backendUrl + '/api/cart/add',
                    { itemId, size },
                    { headers: { token } }
                );
                console.log("📥 addToCart API response:", response.data);
            } catch (error) {
                console.log("❌ addToCart API error:", error);
                toast.error(error.message);
            }
        } else {
            console.log("❌ No token found in headers, cart item not added.");
        }
    };

    // Function: Count total cart items
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log("🛑 Error while calculating cart count:", error);
                }
            }
        }
        return totalCount;
    };

    // Function: Update item quantity in the cart
    const updateQuantity = async (itemId, size, quantity) => {
        console.log("🛒 [updateQuantity] Updating item, token:", token);
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        if (token) {
            try {
                console.log("📤 Sending updateQuantity API request with token:", token);
                const response = await axios.post(
                    backendUrl + '/api/cart/update',
                    { itemId, size, quantity },
                    { headers: { token } }
                );
                console.log("📥 updateQuantity API response:", response.data);
            } catch (error) {
                console.log("❌ updateQuantity API error:", error);
                toast.error(error.message);
            }
        }
    };

    // Function: Calculate total amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product.id.toString() === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    console.log("🛑 Error while calculating cart amount:", error);
                }
            }
        }
        return totalAmount;
    };

    // Function: Get products data from backend
    const getProductsData = async () => {
        console.log("🔄 Fetching product data...");
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                console.log("✅ Products fetched successfully");
                setProducts(response.data.products);
            } else {
                console.log("❌ Product fetch error:", response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("❌ getProductsData error:", error);
            toast.error(error.message);
        }
    };

    // Function: Get user cart data from backend
    const getUserCart = async (token) => {
        console.log("🛒 Fetching cart with token:", token);
        try {
            const response = await axios.post(
                backendUrl + '/api/cart/get',
                {},
                { headers: { token } }
            );
            if (response.data.success) {
                console.log("✅ Cart fetched successfully");
                setCartItems(response.data.cartData);
            } else {
                console.log("❌ Cart fetch error:", response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("❌ getUserCart error:", error);
            toast.error(error.message);
        }
    };

    // useEffect: Fetch product data when component mounts
    useEffect(() => {
        console.log("👀 Running getProductsData useEffect");
        getProductsData();
    }, []);

    // useEffect: Check for token in localStorage on mount
    useEffect(() => {
        console.log("👀 Checking token in localStorage...");
        const storedToken = localStorage.getItem('token');
        if (!token && storedToken) {
            console.log("💾 Found token in localStorage:", storedToken);
            setToken(storedToken);
            getUserCart(storedToken);
        } else {
            console.log("💾 No token found in localStorage");
        }
    }, []); // Only runs once on mount

    // useEffect: If token state updates, refetch the cart
    useEffect(() => {
        if (token) {
            console.log("✅ Token is available, refreshing user cart...");
            getUserCart(token);
        }
    }, [token]);

    // Provide context value to children
    const value = { 
        products, 
        currency, 
        delivery_fee,
        search, 
        setSearch, 
        showSearch, 
        setShowSearch,
        cartItems, 
        setCartItems, 
        addToCart, 
        getCartCount, 
        updateQuantity, 
        getCartAmount,
        navigate, 
        backendUrl, 
        token, 
        setToken,
        setProducts
    };

    return ( 
        <ShopContext.Provider value={value}> 
            {props.children}
        </ShopContext.Provider> 
    );
};

export default ShopContextProvider;

