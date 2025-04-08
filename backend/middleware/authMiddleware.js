// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   console.log("🔹 Received Authorization Header:", authHeader);

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     console.log("❌ No token provided");
//     return res.status(401).json({ message: "Access denied. No token provided." });
//   }

//   const token = authHeader.split(" ")[1];
//   console.log("🔹 Extracted Token:", token);

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("✅ Token Decoded:", decoded);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error("❌ JWT Verification Error:", error.message);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// export default authMiddleware;

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    console.log("\n🔍 Auth Middleware Triggered");
    console.log("🔹 Request Headers:", req.headers);

    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("❌ No valid Authorization header provided");
        return res.status(403).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    console.log("🔹 Extracted Token:", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token Verified:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("❌ Invalid Token:", error.message);
        return res.status(403).json({ message: "Access denied. Invalid token." });
    }
};

export default authMiddleware;
