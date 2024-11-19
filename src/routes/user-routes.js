import express from "express";
import authorize from "../middleware/authorization.js";
import createUserRepository from "../adaptors/in-memory-db/user.js";
import createUserService from "../core/user/service.js";
import createUserController from "../adaptors/http/users.js";

const ROLES = ["guest"];
const router = express.Router();
const userRepository = createUserRepository();
const userService = createUserService(userRepository);
const { getAllUsers, addUser } = createUserController(userService);

router.get("/", authorize([...ROLES, "admin", "user"]), getAllUsers);
router.post("/", authorize([...ROLES, "admin"]), addUser);

export default router;
