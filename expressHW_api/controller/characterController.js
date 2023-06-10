import Character from "../models/character.js";

const getAll = async (req, res, next) => {
  try {
    const characters = await Character.find();
    return res.status(200).json(characters);
  } catch (err) {
    next(err);
  }
};

const createCharacter = async (req, res, next) => {
  try {
    const dbResponse = await Character.create({
      ...req.body,
      createdBy: req.currentUser._id,
    });
    return res.status(200).json({
      message: `Character succesfully added`,
      addedCharacter: dbResponse,
    });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const findCharacter = await Character.findById(id);
    if (findCharacter) {
      return res.status(200).json({
        message: `Character with id ${id} found`,
        data: findCharacter,
      });
    } else {
      return res.status(404).json({
        message: `There is no data for the character with id of ${id}`,
      });
    }
  } catch (err) {
    next(err);
  }
};

const updateCharacter = async (req, res, next) => {
  const { id } = req.params;
  try {
    const findCharacter = await Character.findById(id);
    if (!findCharacter) {
      return res.status(404).json({ message: `Cat with id ${id} not found` });
    }
    if (
      req.currentUser.role !== "admin" &&
      req.currentUser._id !== findCharacter.createdBy.toString()
    ) {
      return res.status(403).json({ message: "Unauthorised" });
    }
    const updateCharacter = await Character.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });
    if (updateCharacter) {
      return res
        .status(200)
        .json(`Character with id ${id} succesfully updated`);
    } else
      return res.status(404).json(`No data available for character with ${id}`);
  } catch (err) {
    next(err);
  }
};

const removeCharacter = async (req, res, next) => {
  const { id } = req.params;
  try {
    const findCharacter = await Character.findById(id);
    if (!findCharacter) {
      return res.status(404).json({ message: `Cat with id ${id} not found` });
    }
    if (
      req.currentUser.role !== "admin" &&
      req.currentUser._id !== findCharacter.createdBy.toString()
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }
    const deleteCharacter = await Character.findByIdAndDelete(id);
    if (deleteCharacter) {
      return res
        .status(200)
        .json(`Character with id ${id} succesfully deleted`);
    } else
      return res.status(404).json(`No data available for character with ${id}`);
  } catch (err) {
    next(err);
  }
};

export default {
  getAll,
  createCharacter,
  getById,
  updateCharacter,
  removeCharacter,
};
