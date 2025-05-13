import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const { token } = req.headers; // Extract token from headers

    // Debug: Log incoming headers for troubleshooting
    console.log("Incoming headers:", req.headers);

    // Check if token exists
    if (!token) {
        console.log("❌ No token found in headers");
        return res.json({ success: false, message: 'Not Authorized Login Again' });
    }

    console.log("🟢 Received token:", token);

    try {
        // Decode the token
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("🟢 Token decoded successfully:", token_decoded);

        // Attach userId to request body
        req.body.userId = token_decoded.id;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.log("❌ Error decoding token:", error.message);
        res.json({ success: false, message: 'Invalid or expired token' });
    }
};

export default authUser;
