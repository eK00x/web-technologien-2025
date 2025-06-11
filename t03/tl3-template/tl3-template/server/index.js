import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.listen(3000, () => {
  console.log(`Started on port 3000, go to http://localhost:3000`);
});
