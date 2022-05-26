import { useState, useEffect } from 'react';
import AddContact from './components/AddContact';
import Contact from './components/Contact';
import Header from './components/Header';
import Notification from './components/Notification';
import Search from './components/Search';
import personServices from './services/persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [search, setSearch] = useState('');
	const [message, setMessage] = useState(null);
	const [messageStyle, setMessageStyle] = useState('success');

	useEffect(() => {
		personServices.getAll().then((allPersons) => setPersons(allPersons));
	}, []);

	const handleChange = (e) => {
		setNewName(e.target.value);
	};

	const handleChangeNum = (e) => {
		setNewNumber(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			persons.some(
				(person) => person.name.toLowerCase() === newName.toLowerCase()
			)
		) {
			if (
				window.confirm(
					`${newName} is already added in to phonebook, replace the old number with the new number?`
				)
			) {
				const id = persons.filter(
					(person) => person.name.toLowerCase() === newName.toLowerCase()
				)[0].id;
				const updatedObj = { name: newName, number: newNumber };
				personServices
					.update(id, updatedObj)
					.then((updatedPerson) => {
						setPersons(
							persons.map((person) =>
								person.id !== id ? person : updatedPerson
							)
						);
						setNewName('');
						setNewNumber('');

						setMessage(`${newName} was successfully updated.`);
						setTimeout(() => {
							setMessage(null);
						}, 2000);
					})
					.catch((error) => {
						console.log('failed');
						setMessage(
							`Information of ${newName} has already been removed from server.`
						);
						setMessageStyle('failed');
						setTimeout(() => {
							setMessage(null);
						}, 2000);
					});
			}
		} else {
			const contactObj = {
				name: newName,
				number: newNumber,
			};

			personServices.create(contactObj).then((addedPerson) => {
				setPersons(persons.concat(addedPerson));
				setNewName('');
				setNewNumber('');
			});

			setMessage(`${newName} was successfully added.`);
			setMessageStyle('success');
			setTimeout(() => {
				setMessage(null);
			}, 2000);
		}
	};

	const handleFilter = (e) => {
		setSearch(e.target.value.toLowerCase());
	};

	const handleDelete = (personObj) => {
		if (window.confirm(`Delete ${personObj.name} ?`)) {
			console.log('delete item with id ' + personObj.id);
			personServices.remove(personObj.id);
			setPersons(persons.filter((person) => person.id !== personObj.id));
		}
	};

	return (
		<div>
			<Header name={'Phonebook'} />
			<Notification message={message} messageStyle={messageStyle} />
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
					return (
						<Contact
							name={person.name}
							tel={person.number}
							key={person.id}
							handleDelete={() => handleDelete(person)}
						/>
					);
				}
				return null;
			})}
		</div>
	);
};

export default App;
