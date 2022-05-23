import { useState } from 'react';
import Header from './components/Header';
import Button from './components/Button';
import Statistics  from './components/Statistics';

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const addGoodCount = () => {
		setGood(good + 1);
	};
	const addNeutralCount = () => {
		setNeutral(neutral + 1);
	};
	const addBadCount = () => {
		setBad(bad + 1);
	};
	const content = [
		{
			good,
		},
		{
			neutral,
		},
		{
			bad,
		},
		{
			all: good + neutral + bad,
		},
		{
			average:
				good + neutral + bad > 0
					? (good - bad) / (good + neutral + bad)
					: 0,
		},
		{
			positive:
				good + neutral + bad > 0
					? ((good) / (good + neutral + bad)) * 100 + " %"
					: 0,
		},
	];

	return (
		<>
			<Header title={'give feedback'} />
			<Button text={'good'} handleClick={addGoodCount} />
			<Button text={'neutral'} handleClick={addNeutralCount} />
			<Button text={'bad'} handleClick={addBadCount} />
			<Header title={'statistic'} />
			<Statistics content={content} />
		</>
	);
};

export default App;
