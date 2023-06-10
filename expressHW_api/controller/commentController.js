import Character from "../models/character.js";

const createComment = async (req, res, next) => {
  const { characterId } = req.params;
  const { text } = req.body;
  console.log("id:", characterId);
  //Character.comments.push(req.body)
  try {
    const findCharacter = await Character.findById(characterId);
    console.log("findCharacter:", findCharacter);
    if (!findCharacter) {
      return res
        .status(404)
        .json({ message: `Data for character with ${characterId} not found` });
    }

    if (
      req.currentUser.id !== findCharacter.createdBy.toString() &&
      req.currentUser.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorised" });
    }
    findCharacter.comments.push({ text, createdBy: req.currentUser.id });
    await findCharacter.save();
    return res.status(200).json({ message: "Comment succesfully added" });
  } catch (err) {
    next(err);
  }
};

const updateComment = async (req, res, next) => {
  const { characterId } = req.params;
  const { commentId } = req.params;
  const { text } = req.body;

  try {
    const findCharacter = await Character.findById(characterId);

    if (!findCharacter) {
      return res
        .status(404)
        .json({ message: `Data for character with ${characterId} not found` });
    }

    const commentToUpdate = findCharacter.comments.id(commentId);

    if (!commentToUpdate) {
      return res
        .status(404)
        .json({ message: `Comment with id ${commentId} not found` });
    }

    if (
      req.currentUser.id !== commentToUpdate.createdBy.toString() &&
      req.currentUser.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorised" });
    }
    commentToUpdate.text = text;
    await findCharacter.save();
    return res.status(200).json({ message: "Comment successfully updated" });
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  const { characterId } = req.params;
  const { commentId } = req.params;

  try {
    const findCharacter = await Character.findById(characterId);

    if (!findCharacter) {
      return res
        .status(404)
        .json({ message: `Data for character with ${characterId} not found` });
    }

    const commentToDelete = findCharacter.comments.id(commentId);

    if (!commentToDelete) {
      return res
        .status(404)
        .json({ message: `Comment with id ${commentId} not found` });
    }

    if (
      req.currentUser.id !== commentToDelete.createdBy.toString() &&
      req.currentUser.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorised" });
    }
    commentToDelete.remove();
    await findCharacter.save();
    return res.status(200).json({ message: "Comment successfully deleted" });
  } catch (err) {
    next(err);
  }
};

export default {
  createComment,
  updateComment,
  deleteComment,
};
