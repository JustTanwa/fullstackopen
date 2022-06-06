const mongoose = require('mongoose');
const config = require('../utils/config');

const uri = config.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('error connecting to MongoDB: ', err.message);
  });

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// remove _id and __version field when sending json data

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
