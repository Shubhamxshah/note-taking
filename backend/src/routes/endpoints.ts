import { Router } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path"
import fs from "fs";
export const noteRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  }, 
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, path.basename(file.originalname, path.extname(file.originalname)) + "-" + uniqueSuffix);
  },
})

const upload = multer({ storage: storage})

noteRouter.post("/extract_md", upload.single("file"), (req, res) => {
  if (!req.file){
    res.status(400).json({message: "No file uploaded"});
    return;
  }

  fs.readFile(`uploads/${req.file.filename}`, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file: ", err);
      res.status(500).json({error: "error reading this file"});
      return;
    }

    res.status(200).json({
      message: "file uploaded successfully", 
      content: data 
    })
    return;
  })


})

