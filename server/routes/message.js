import express from "express";
import {
    addMessages, getMessages
} from "../controllers/message.js";

const router = express.Router();

/* UPDATE */
router.post("/updateMessage", addMessages);
/* GET */
router.post("/getMessages", getMessages);

export default router;