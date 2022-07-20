const express = require("express");
const app = express();
const keypad = require("./utils/keypad");
const wordmatch = require("./utils/wordmatch");

const port = process.env.PORT || 5000;

app.get("/keys", async (req, res) => {
  const request = req.query.key;

  if (!request) {
    return res.status(400).send({
      error: "You must send a key",
    });
  }

  await res.status(200).json(keypad(request));``
});

app.get("/keys/words", async (req, res) => {
  const request = req.query;

  if (!req.query) {
    return res.status(400).send({
      error: "You must provide some letters to match with words",
    });
  }

  await res.status(200).json(wordmatch(request));
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});