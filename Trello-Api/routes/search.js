import express from "express";
import { getUsersBySearch } from "../controllers/search.js";

const searchRouter = express.Router();

searchRouter.get("/user/:searchBody", getUsersBySearch);

export default searchRouter;
