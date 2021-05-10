const express = require("express");
const mongoose = require("mongoose");
const { 
  MONGO_USER,
  MONGO_PASSWORD, 
  MONGO_IP, 
  MONGO_PORT,
} = require("./config/config");

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useUnifiedTopology: true, 
      useNewUrlParser: true, 
      useCreateIndex: true, 
      useFindAndModify: false, 
    })
    .then(() => console.log("successfully connected to DB"))
    .catch((e) => { 
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.send("<h2>I am learning this and a nice job!</h2>");
  console.log("yes, it's working!");
});

//localhost:3000/posts
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));