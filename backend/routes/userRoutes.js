import express from "express";
import { createUser } from "../controllers/userController.js";
const router = express.Router();

router.route('/').post(createUser)

export default router;