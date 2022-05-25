import React, { useState } from 'react';
import Country from './Country';

export default function CountryListItem({ country }) {
	const [show, setShow] = useState(false);
	return (
		<>
			<p>
				{country.name.common}
				<button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}</button>
			</p>
			{show && (
				<Country
					name={country.name.common}
					capital={country.capital}
					area={country.area}
					flag={country.flags.png}
					languages={country.languages}
				/>
			)}
		</>
	);
}
