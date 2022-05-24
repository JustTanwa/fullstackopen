import { useState } from 'react';
import AddContact from './components/AddContact';
import Contact from './components/Contact';
import Header from './components/Header';
import Search from './components/Search';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', tel: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', tel: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', tel: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', tel: '39-23-6423122', id: 4 },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [search, setSearch] = useState('');

	const handleChange = (e) => {
		setNewName(e.target.value);
	};

	const handleChangeNum = (e) => {
		setNewNumber(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (persons.some((person) => person.name === newName)) {
			return alert(`${newName} is already added in to phonebook`);
		}
		setPersons(persons.concat({ name: newName, tel: newNumber }));
		setNewName('');
		setNewNumber('');
	};

	const handleFilter = (e) => {
		setSearch(e.target.value.toLowerCase());
	};

	return (
		<div>
			<Header name={'Phonebook'} />
			<Search onChange={handleFilter} />
			<Header name={'Add a new'} />
			<AddContact
				name={newName}
				number={newNumber}
				changeName={handleChange}
				changeNumber={handleChangeNum}
				onSubmit={handleSubmit}
			/>
			<Header name={'Numbers'} />
			{persons.map((person) => {
				if (person.name.toLowerCase().includes(search)) {
					return <Contact name={person.name} tel={person.tel} key={person.name}/>
				}
			})}
		</div>
	);
};

export default App;
