import connectToDb from "./db.js";
import mongoose from "mongoose";
import Character from "../models/character.js";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const hashPassword = async (plainTextPassword) => {
  const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
  return hashedPassword;
};

const userId = "63fd33bcc6de8470f46913a4";
const admidId = "63fd33bcc6de8470f46913a3";

const seedingData = {
  characters: [
    {
      name: "Ned",
      house: "Stark",
      comments: [{ text: "nice", createdBy: userId }],
    },
    { name: "Khallesi", house: "No house", hasHouse: false },
  ],
  users: [
    {
      email: "admin@gmail.com",
      userName: "Administrator",
      password: await hashPassword("adminPassword"),
      role: "admin",
      _id: admidId,
    },
    {
      email: "user@gmail.com",
      userName: "User",
      password: await hashPassword("userPassword"),
      role: "user",
      _id: userId,
    },
  ],
};

const seedDb = async () => {
  await connectToDb();
  await mongoose.connection.db.dropDatabase();
  const charactersWithCreatedBy = seedingData.characters.map((character) => {
    return { ...character, createdBy: userId };
  });
  console.log("Database connected!");
  await Character.create(charactersWithCreatedBy);
  console.log(`Succesfully created ${charactersWithCreatedBy}`);
  await User.create(seedingData.users);
  console.log(`Succesfully created ${seedingData.users}`);
  await mongoose.disconnect();
};
seedDb();
