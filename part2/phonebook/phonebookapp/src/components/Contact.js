import React from 'react';

export default function Contact({ name, tel, key }) {
	return (
		<p key={key}>
			{name} {tel}
		</p>
	);
}
