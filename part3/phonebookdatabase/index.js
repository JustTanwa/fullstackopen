require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

// middleware server index.html
app.use(express.static('build'));
// middleware for parsing request body
app.use(express.json());
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
morgan.token('body', function (req, res) {
	return JSON.stringify(req.body);
});
app.use(cors());

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	}

	next(error);
};
app.use(errorHandler);

app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>');
});

app.get('/info', (request, response) => {
	Person.find({}).then((persons) => {
		response.send(`<p>Phonebook has info for ${persons.length} people.</p>
  <p> ${new Date()}</p>
  `);
	});
});

app.get('/api/persons', (request, response) => {
	Person.find({}).then((persons) => {
		response.json([...persons]);
	});
});

app.post('/api/persons', (request, response) => {
	const newPerson = request.body;
	if (!newPerson.name || !newPerson.number) {
		return response.status(400).json({
			error: 'name or number is missing',
		});
	}
	const personToAdd = new Person({
		name: newPerson.name,
		number: newPerson.number,
	});

	personToAdd.save().then((savedPerson) => {
		response.json(savedPerson);
	});
});

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			if (person) {
				response.json(person);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
	const person = request.body;

	const personToUpdate = {
		name: person.name,
		number: person.number,
	};

	Person.findByIdAndUpdate(request.params.id, personToUpdate, { new: true })
		.then((updatedPerson) => {
			response.json(updatedPerson);
		})
		.catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response) => {
	Person.findByIdAndRemove(request.params.id)
		.then((result) => {
			response.status(204).end();
		})
		.catch((error) => next(error));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
