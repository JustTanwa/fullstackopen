import React from 'react';
import StatisticLine from './StatisticLine';

export default function Statistics({ content }) {
	const [goodObj, neutralObj, badObj] = content;
	const { good } = goodObj;
	const { neutral } = neutralObj;
	const { bad } = badObj;
	if (good === 0 && neutral === 0 && bad === 0) {
		return <p>No feedback given</p>;
	} else {
		return (
			<table>
				{content.map((stat) => (
					<StatisticLine
						key={Object.keys(stat)[0]}
						text={Object.keys(stat)[0]}
						value={Object.values(stat)[0]}
					/>
				))}
			</table>
		);
	}
}
