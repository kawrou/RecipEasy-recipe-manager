const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const usersRouter = require("./routes/users");
const authenticationRouter = require("./routes/authentication");
const recipeRouter = require("./routes/recipes");
const tokenChecker = require("./middleware/tokenChecker");
const Recipe = require("./models/recipe");

const app = express();

//Upload path for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})

app.post("/upload", upload.single('file'), (req, res) => {
  Recipe.create({image: req.file.filename})
  .then(result => res.json(result))
  .catch(err => console.log(err))

})

// Allow requests from any client
// docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
// docs: https://expressjs.com/en/resources/middleware/cors.html
app.use(cors());

// Parse JSON request bodies, made available on `req.body`
app.use(bodyParser.json());

// API Routes
app.use("/users", usersRouter);
app.use("/tokens", authenticationRouter);
app.use("/recipes", tokenChecker, recipeRouter);

// 404 Handler
app.use((_req, res) => {
  res.status(404).json({ err: "Error 404: Not Found" });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  if (process.env.NODE_ENV === "development") {
    res.status(500).send(err.message);
  } else {
    res.status(500).json({ err: "Something went wrong" });
  }
});

module.exports = app;
