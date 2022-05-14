const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const ToDo = require("./models/todo");

const port = 5000;
const { JWT_SECRET, MONGO_URI } = require("./congig/keys");
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`Mongoose connected`);
  })
  .catch((e) => {
    console.log(e);
  });

app.use(cors());
app.use(express.json());
// --------------------------------------------------------------

const requireLogin = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in." });
  }

  try {
    const { userId } = jwt.verify(authorization, JWT_SECRET);
    req.user = userId;
    next();
  } catch (e) {
    console.log(e);
  }
};

// ----------------------------------------------------------------

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(200).json({ error: "Please fill all the fields..." });
    }

    const findUser = await User.findOne({ email });
    if (findUser) {
      return res
        .status(200)
        .json({ error: `User already exists with ${findUser.email}` });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({ email, password: hashedPassword });
    res.status(200).json({ message: "Signup success!!. You can login now." });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(200).json({ error: "Please fill all the fields..." });
    }
    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(200).send({ error: `No user exists with ${email}` });
    }

    const isMatched = await bcrypt.compare(password, findUser.password);
    if (!isMatched) {
      return res.status(200).send({ error: `Invalid Credentials` });
    }

    const token = jwt.sign(
      {
        userId: findUser._id,
      },
      JWT_SECRET
    );

    res.status(200).json({ token });
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

app.post("/createtodo", requireLogin, async (req, res) => {
  const { todo } = req.body;
  try {
    const newtodo = await ToDo.create({ todo, todoBy: req.user });
    res.status(200).send({ message: newtodo });
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

app.get("/gettodo", requireLogin, async (req, res) => {
  try {
    const alltodos = await ToDo.find({ todoBy: req.user });
    res.status(200).send(alltodos);
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

app.delete("/delete/:id", requireLogin, async (req, res) => {
  try {
    const deleteTodo = await ToDo.findOneAndRemove({
      _id: req.params.id,
      todoBy: req.user,
    });
    res.status(200).send(deleteTodo);
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

// ----------------------------------------------------------------

if (process.env.NODE_ENV == "production") {
  const path = require("path");

  app.get("/", (req, res) => {
    app.use(
      express.static(path.resolve(__dirname, "reduxtookittodo", "build"))
    );
    res.sendFile(
      path.resolve(__dirname, "reduxtookittodo", "build", "index.html")
    );
  });
}

// -------------------------------------------------------------------

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
