const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require("cors");


// middleware
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors());
app.use(express.static('build'));

morgan.token('body', function(req, res) {
    return JSON.stringify(req.body);
});

let persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: 4,
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
	{
		id: 5,
		name: 'Bary Poppendieck',
		number: '39-23-6423132',
	},
];

app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>');
});

app.get('/info', (request, response) => {
	response.send(`<p>Phonebook has info for ${persons.length} people.</p>
  <p> ${new Date()}</p>
  `);
});

app.get('/api/persons', (request, response) => {
	response.json(persons);
});

app.post('/api/persons', (request, response) => {
	const newPerson = request.body;
	if (!newPerson.name || !newPerson.number) {
		return response.status(400).json({
			error: 'name or number is missing',
		});
	}
	const exist = persons.find(
		(person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
	);
	console.log(exist);
	if (exist) {
		return response.status(400).json({
			error: 'name already in the phone book',
		});
	}

	const randomID = () => Math.floor(Math.random() * 10000000);
	newPerson.id = randomID();
	persons.concat(newPerson);
	response.json(newPerson);
});

app.get('/api/persons/:id', (request, response) => {
	const id = +request.params.id;
	const person = persons.find((person) => person.id === id);
	if (person) {
		response.json(person);
	} else {
		response.statusMessage = 'Person not found';
		response
			.status(404)
			.send('<h1>Ooops unable to find the person you are looking for.</h1>');
	}
});

app.delete('/api/persons/:id', (request, response) => {
	const id = +request.params.id;
	persons = persons.filter((person) => person.id !== id);
	response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
