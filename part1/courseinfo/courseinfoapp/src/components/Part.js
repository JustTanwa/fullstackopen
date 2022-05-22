import React from 'react';

export default function Part({ partname, partcount }) {
	return (
		<p>
			{partname} {partcount}
		</p>
	);
}
