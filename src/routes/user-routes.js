import express from "express";
import authorize from "../middleware/authorization.js";
import createUserRepository from "../adaptors/in-memory-db/user.js";
import { createUserService } from "../core/user.js";
import createUserController from "../adaptors/http/users.js";

const ROLES = ["guest"];
const router = express.Router();
const userRepository = createUserRepository();
const userService = createUserService(userRepository);
const { getAllUsers, getUserById, searchUsers, addUser, removeUserById } =
  createUserController(userService);

router.get("/search", authorize([...ROLES]), searchUsers);
router.get("/:id", authorize([...ROLES]), getUserById);
router.get("/", authorize([...ROLES]), getAllUsers);
router.post("/", authorize([...ROLES]), addUser);
router.delete("/:id", authorize([...ROLES]), removeUserById);

export default router;
