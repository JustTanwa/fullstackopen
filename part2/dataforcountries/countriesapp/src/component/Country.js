import React from 'react';

export default function Country({name, capital, area, languages, flag}) {
	return (
		<div>
			<h1>{name}</h1>
			<p>capital {capital}</p>
			<p>area {area}</p>
			<h4>languages:</h4>
			<ul>
				{languages.map((lang) => (
					<li key={lang}>{lang}</li>
				))}
			</ul>
			<img src={flag} alt={'flag of ' + name} />
		</div>
	);
}
