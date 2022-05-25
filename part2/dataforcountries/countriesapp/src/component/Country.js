import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Country({ name, capital, area, languages, flag }) {
	const [weather, setWeather] = useState();
	const api_key = process.env.REACT_APP_API_KEY;
	const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`;
	const [error, setError] = useState('');

	const getLangArray = (langObj) => {
		let languages = [];
		for (let langKey in langObj) {
			languages.push(langObj[langKey]);
		}
		return languages;
	};

	const langs = getLangArray(languages);

	useEffect(() => {
		axios
			.get(API_URL)
			.then((res) => setWeather(res.data))
			.catch((error) => {
				if (error.response) {
					setError('Unable to obtain weather information.');
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('Error', error.message);
				}
			});
	}, [API_URL]);

	return (
		<div>
			<h1>{name}</h1>
			<p>capital {capital}</p>
			<p>area {area}</p>
			<h4>languages:</h4>
			<ul>
				{langs.map((lang) => (
					<li key={lang}>{lang}</li>
				))}
			</ul>
			<img src={flag} alt={'flag of ' + name} />
			{weather && (
				<>
					<h2>Weather in {capital}</h2>
					<p>tempature {weather.main.temp} Celcius</p>
					<img
						src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
						alt={'the weather icon of the city'}
					></img>
					<p>wind {weather.wind.speed} m/s</p>
				</>
			)}
			<p>{error}</p>
		</div>
	);
}
