const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

console.log('Connecting to...', uri);

mongoose
	.connect(uri)
	.then((result) => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.log('error connecting to MongoDB: ', err.message);
	});

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

// remove _id and __version field when sending json data

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  });

  module.exports = mongoose.model('Person', personSchema)