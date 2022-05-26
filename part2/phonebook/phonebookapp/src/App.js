import { useState, useEffect } from 'react';
import AddContact from './components/AddContact';
import Contact from './components/Contact';
import Header from './components/Header';
import Search from './components/Search';
import axios from 'axios';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [search, setSearch] = useState('');

	useEffect(()=> {
		axios
			.get("http://localhost:3001/persons")
			.then(res => {
				setPersons(res.data);
			})
	}, [])

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
					return <Contact name={person.name} tel={person.number} key={person.name}/>
				}
			})}
		</div>
	);
};

export default App;
