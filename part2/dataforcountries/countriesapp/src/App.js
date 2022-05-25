import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Countries from './component/Countries';

export default function App() {
	const [search, setSearch] = useState('');
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		axios
			.get('https://restcountries.com/v3.1/all')
			.then((res) => setCountries(res.data));
	}, []);

	const handleSearch = (e) => {
		setSearch(e.target.value.toLowerCase());
	};

	return (
		<div>
			<div>
				find countries <input value={search} onChange={handleSearch} />
			</div>
			<div>
				<Countries
					countries={countries.filter((country) =>
						country.name.common.toLowerCase().includes(search)
					)}
				/>
			</div>
		</div>
	);
}
