const express = require("express");

const app = express();
app.use(express.json());
require("dotenv").config();

app.get("api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});
app.post("/api/notes", (req, res) => {
  const body = req.body;
  if (body.content === undefined) {
    return res.status(400).json({ error: "content missing" });
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });
  note.save().then((savedNote) => {
    res.json(savedNote);
  });
});
app.get("/api/notes/:id", (req, res, next) => [
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.json(404).end();
      }
    })
    .catch((error) => {
      next(error);
    }),
]);
app.delete("api/notes/:id"),
  (req, res, next) => {
    Note.findByIdAndDelete(req.params.id)
      .then((result) => {
        res.status(204).end();
      })
      .catch((error) => next(error));
  };
app.put("api/notes/:id", (req, res, next) => {
  const body = req.body;
  const note = {
    content: body.content,
    important: body.important,
  };
  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((error) => next(error));
});
const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndPoint);
const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is at ${PORT}`);
});
