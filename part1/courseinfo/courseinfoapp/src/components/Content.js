import React from 'react';
import Part from './Part';

export default function Content({part1, part2, part3}) {
	return (
		<>
			<Part partname={part1.part1} partcount={part1.exercises1} />
			<Part partname={part2.part2} partcount={part2.exercises2} />
			<Part partname={part3.part3} partcount={part3.exercises3} />
		</>
	);
}
