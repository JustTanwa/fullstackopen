import React from 'react';
import Country from './Country';

export default function Countries({ countries }) {
	const getLangArray = (langObj) => {
		let languages = [];
		for (let langKey in langObj) {
			languages.push(langObj[langKey]);
		}
		return languages;
	};

	if (countries.length === 1) {
		const country = countries[0];
		const languages = getLangArray(country.languages);
		return (
			<Country
				name={country.name.common}
				capital={country.capital}
				area={country.area}
				flag={country.flags.png}
				languages={languages}
			/>
		);
	} else if (countries.length === 0) {
		return 'No countries match';
	} else if (countries.length <= 10) {
		return (
			<>
				{countries.map((country) => (
					<p key={country.name.common}>
						{country.name.common}
					</p>
				))}
			</>
		);
	} else {
		return 'Too many matches, please specify another filter';
	}
}
