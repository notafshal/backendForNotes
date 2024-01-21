const mongoose = require("mongoose");

const url = process.env.MONGO_URI;

console.log(url);
mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected");
  })
  .catch((error) => {
    console.log("failed", error.message);
  });
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    (returnedObject.id = returnedObject), _id.toStirng();
    delete returnedObject._id;
    delete returnedObject._v;
  },
});
module.exports = mongoose.model("Note", noteSchema);
