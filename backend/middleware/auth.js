// import jwt from 'jsonwebtoken';

// const authUser = async (req, res, next) => {
//     const { token } = req.headers; // Extract token from headers

//     // Debug: Log incoming headers for troubleshooting
//     console.log("Incoming headers:", req.headers);

//     // Check if token exists
//     if (!token) {
//         console.log("❌ No token found in headers");
//         return res.json({ success: false, message: 'Not Authorized Login Again' });
//     }

//     console.log("🟢 Received token:", token);

//     try {
//         // Decode the token
//         const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("🟢 Token decoded successfully:", token_decoded);

//         // Attach userId to request body
//         req.body.userId = token_decoded.id;

//         // Proceed to the next middleware or route handler
//         next();
//     } catch (error) {
//         console.log("❌ Error decoding token:", error.message);
//         res.json({ success: false, message: 'Invalid or expired token' });
//     }
// };

// export default authUser;
import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    // Check for token in Authorization header or token header
    const authHeader = req.headers.authorization || req.headers.token;

    console.log("Incoming headers:", req.headers);

    if (!authHeader || (!authHeader.startsWith('Bearer ') && !authHeader)) {
        console.log("❌ No token found in headers");
        return res.status(401).json({ success: false, message: 'Not Authorized. Login Again.' });
    }

    // If it's a Bearer token, split to get token value
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
    console.log("🟢 Received token:", token);

    try {
        console.log("JWT_SECRET:", process.env.JWT_SECRET);

        // Decode the token using JWT
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("🟢 Token decoded successfully:", decodedToken);

        req.body.userId = decodedToken.id; // Store user ID in request body
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        console.log("❌ Error decoding token:", error.message);
        return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
};

export default authUser;
