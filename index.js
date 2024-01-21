const express = require("express");
const getNotes = require("./controller/getNotes");
const createNote = require("./controller/CreateNote");
const getSingleNote = require("./controller/getSingleNote");
const deleteNote = require("./controller/DeleteNote");
const updateNotes = require("./controller/updateNotes");

const app = express();
app.use(express.json());
require("dotenv").config();

app.get("api/notes", getNotes);
app.post("/api/notes", createNote);
app.get("/api/notes/:id", getSingleNote);
app.delete("api/notes/:id", deleteNote);

app.put("api/notes/:id", updateNotes);
const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndPoint);
const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is at ${PORT}`);
});
