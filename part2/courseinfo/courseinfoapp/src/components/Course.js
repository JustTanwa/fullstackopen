import React from 'react';

const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>;

const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
);

const Content = ({ parts }) => (
	<>
		{parts.map((part) => (
			<Part key={part.id} part={part} />
		))}
        <Total sum={parts.reduce((tot, part) => tot + part.exercises,0)} />
	</>
);

export default function Course({ course }) {
	return (
		<>
			<Header course={course.name} />
			<Content parts={course.parts} />
		</>
	);
}
