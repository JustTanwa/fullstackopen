import React from 'react';

export default function Search({onChange}) {
	return (
		<div>
			filter shown with <input onChange={onChange} />
		</div>
	);
}
