const getNotes = (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
};
module.exports = getNotes;
