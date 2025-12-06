// backend/src/controllers/auth.controller.js
import  users from "../data/users.js";
import { v4 as uuid } from "uuid";
import { signToken } from "../utils/jwtUtils.js";
import { formatDate } from "../utils/date.js";

// signup
export const signup = (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const existing = users.find(u => u.email === email);
  if (existing) return res.status(422).json({ errors: ["Email already registered"] });

  const newUser = {
    _id: uuid(),
    firstName,
    lastName,
    email,
    password,
    createdAt: formatDate(),
    updatedAt: formatDate(),
    cart: [],
    wishlist: []
  };

  users.push(newUser);
  const token = signToken({ userId: newUser._id, email: newUser.email });

  return res.json({ createdUser: newUser, encodedToken: token });
};

// login
export const login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ errors: ["User not found"] });
  if (user.password !== password) return res.status(401).json({ errors: ["Incorrect password"] });

  const token = signToken({ userId: user._id, email: user.email });
  return res.json({ foundUser: user, encodedToken: token });
};
