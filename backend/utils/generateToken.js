import jwt from "jsonwebtoken";

const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("token", token, { // CHANGE: Use 'token' variable here, NOT 'null'
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true,
    sameSite: 'none', 
    secure: true      
  });
};

export default generateToken;
