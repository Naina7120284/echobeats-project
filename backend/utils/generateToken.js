import jwt from "jsonwebtoken";

const generateToken = (id, res) => {
  // FIXED: Changed Jwt_secret to JWT_SECRET to match your .env file
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true, // Prevents XSS attacks by not allowing JS to access the cookie
    sameSite: "strict", // Protects against CSRF attacks
    secure: process.env.NODE_ENV === "production", // Cookie only sent over HTTPS in production
  });
};

export default generateToken;
