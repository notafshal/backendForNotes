const getSingleNote = (req, res, next) => {
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
    });
};
module.exports = getSingleNote;
