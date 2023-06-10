import express from "express";
import characterController from "./controller/characterController.js";
import userController from "./controller/userController.js";
import commentController from "./controller/commentController.js";
import auth from "./middleware/auth.js";
import { body } from "express-validator";
import validate from "./middleware/validate.js";

const router = express.Router();

router
  .route("/characters")
  .get(characterController.getAll)
  .post(auth, characterController.createCharacter);

router
  .route("/characters/:id")
  .get(characterController.getById)
  .patch(
    auth,
    body("_id").not().exists(),
    validate,
    characterController.updateCharacter
  )
  .delete(auth, characterController.removeCharacter);

router
  .route("/register")
  .post(
    body("email").isEmail(),
    body("password").isLength({ min: 7 }),
    body("role"),
    validate,
    userController.register
  );
router.route("/login").post(userController.login);

router
  .route("/comment/:characterId")
  .post(auth, commentController.createComment);

router
  .route("/characters/:characterId/comments/:commentId")
  .patch(
    auth,
    body("text").trim().isLength({ min: 1 }),
    validate,
    commentController.updateComment
  )
  .delete(auth, commentController.deleteComment);
export default router;
