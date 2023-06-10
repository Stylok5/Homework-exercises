import { JWT_SECRET } from "../consts.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import errorHandler from "./errorHandler.js";

const auth = async (req, res, next) => {
  const rawToken = req.headers.authorization;
  const token = rawToken.replace("Bearer ", "");

  if (!rawToken) {
    return res.status(403).son({ message: "No tokenp provided" });
  }
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const foundUser = await User.findById(decodedToken.id).select(
      "email userName id role"
    );
    if (!foundUser) {
      return res
        .status(403)
        .json({ message: "User with this id does not exist in our database" });
    }
    req.currentUser = foundUser;
    next();
  } catch (err) {
    next(errorHandler);
  }
};

export default auth;
