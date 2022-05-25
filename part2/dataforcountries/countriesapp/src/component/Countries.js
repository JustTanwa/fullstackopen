import Country from './Country';
import CountryListItem from './CountryListItem';

export default function Countries({ countries }) {
	if (countries.length === 1) {
		const country = countries[0];
		return (
			<Country
				name={country.name.common}
				capital={country.capital}
				area={country.area}
				flag={country.flags.png}
				languages={country.languages}
			/>
		);
	} else if (countries.length === 0) {
		return 'No countries match';
	} else if (countries.length <= 10) {
		return (
			<>
				{countries.map((country) => (
					<CountryListItem key={country.name.common} country={country} />
				))}
			</>
		);
	} else {
		return 'Too many matches, please specify another filter';
	}
}
