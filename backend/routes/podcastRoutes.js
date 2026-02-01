import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import uploadFile from "../middlewares/multer.js";
import {
  addPodcast,
  getAllPodcasts,
  getSinglePodcast,
  deletePodcast,
} from "../controllers/podcastControllers.js";

const router = express.Router();

router.post("/new", isAuth, uploadFile, addPodcast);
router.get("/all", isAuth, getAllPodcasts);
router.get("/single/:id", isAuth, getSinglePodcast);
router.delete("/:id", isAuth, deletePodcast);

export default router;
