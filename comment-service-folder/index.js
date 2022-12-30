const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

const app = express();
app.use(bodyParser.json());

const commentsByPostId_Obj = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId_Obj[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId_Obj[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId_Obj[req.params.id] = comments;
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("Listening on 4001:");
});
