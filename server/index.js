
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const cors = require('cors');
require('dotenv').config()
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@learn-fullstack.fhycr.mongodb.net/learn-fullstack?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    console.log("====================================");
    console.log("MongoDB connected");
    console.log("====================================");
  } catch (error) {
    console.log("MongoDB failed", error);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(cors());
app.use(express.json())

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

const PORT = PROCESS.ENV.PORT || 5000;

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));