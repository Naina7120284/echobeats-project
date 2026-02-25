import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(403).json({ message: "Please Login" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    
    // Ensure we await the DB user lookup
    const user = await User.findById(decodedData.id);
    
    if (!user) return res.status(403).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    // If it's a JWT error, it's a 403. If it's a DB error, it's a 500.
    const status = error.name === "JsonWebTokenError" ? 403 : 500;
    res.status(status).json({ message: error.message || "Auth Error" });
  }
};
