import { User } from "../models/User.js";
import TryCatch from "../utils/TryCatch.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

export const registerUser = TryCatch(async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user)
    return res.status(400).json({
      message: "User Already Exists",
    });

  const hashPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  generateToken(user._id, res);

  // Exclude password from the response for security
  const { password: _, ...userWithoutPassword } = user._doc;

  res.status(201).json({
    user: userWithoutPassword,
    message: "User Registered",
  });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  // Manually select password because sometimes models exclude it by default
  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      message: "Invalid Credentials",
    });

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword)
    return res.status(400).json({
      message: "Invalid Credentials",
    });

  generateToken(user._id, res);

  // Exclude password from the response
  const { password: _, ...userWithoutPassword } = user._doc;

  res.status(200).json({
    user: userWithoutPassword,
    message: "User LoggedIN",
  });
});

export const myProfile = TryCatch(async (req, res) => {
  // Ensure req.user exists (provided by your isAuth middleware)
  const user = await User.findById(req.user._id).select("-password");

  res.json(user);
});

export const logoutUser = TryCatch(async (req, res) => {
  // Clear the cookie with standard clear options
  res.cookie("token", "", { 
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });

  res.json({
    message: "Logged Out Successfully",
  });
});

export const saveToPlaylist = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user.playlist.includes(req.params.id)) {
    const index = user.playlist.indexOf(req.params.id);
    user.playlist.splice(index, 1);
    await user.save();

    return res.json({
      message: "Removed from playlist",
    });
  }

  user.playlist.push(req.params.id);
  await user.save();

  return res.json({
    message: "Added to playlist",
  });
});