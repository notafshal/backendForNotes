const createNote = (req, res) => {
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
};
module.exports = createNote;
