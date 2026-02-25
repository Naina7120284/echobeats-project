import jwt from "jsonwebtoken";

const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

res.cookie("token", token, {
  httpOnly: true,
  secure: true,      // Required for Vercel
  sameSite: "none",  // Required for cross-domain
  maxAge: 30 * 24 * 60 * 60 * 1000,
  partitioned: true, // <--- ADD THIS LINE
});
};

export default generateToken;
