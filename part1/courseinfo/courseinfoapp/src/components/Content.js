import React from 'react';

export default function Content({part1, part2, part3}) {
	return (
		<>
			<p>
				{part1.part1} {part1.exercises1}
			</p>
			<p>
				{part2.part2} {part2.exercises2}
			</p>
			<p>
				{part3.part3} {part3.exercises3}
			</p>
		</>
	);
}
