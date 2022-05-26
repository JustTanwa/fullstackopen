import React from 'react';

export default function Contact({ name, tel, handleDelete }) {
	return (
		<p>
			{name} {tel} <button onClick={handleDelete}>delete</button>
		</p>
	);
}
