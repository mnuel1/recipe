const express = require("express");
const path = require("path");

const uploadsRouter = express.Router();

uploadsRouter.get("/uploads/:filename", (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, "../../public/uploads", filename);
    res.sendFile(imagePath);
});

module.exports = uploadsRouter;
