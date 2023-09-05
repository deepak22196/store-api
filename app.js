require("dotenv").config();

const express = require("express");

const app = express();

require("express-async-errors");

const connectDB = require("./db/connect.js");

const errorHandler = require("./middlewares/errorHandler.js");

const productRouter = require("./routes/productRouter.js");

const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use("/api/v1/store", productRouter);

app.use(errorHandler);

app.all("*", (req, res) => {
  res.status(404).send("no such route exists");
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log("server is listening on port:", PORT);
    });
  } catch (error) {
    console.log("error connecting to the database:", error);
  }
};

start();
