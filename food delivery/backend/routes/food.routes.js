import { addFood, list_food,remove_food } from "../controllers/food.Controller.js";
import express from "express";
import multer from "multer";
import Router from "express";

const router = Router();

// image storage engine

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), addFood);

router.get("/list", list_food);
router.post("/remove", remove_food);

export default router;
