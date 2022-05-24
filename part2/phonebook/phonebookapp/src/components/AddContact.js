import React from 'react';

export default function AddContact({onSubmit, name, number, changeName, changeNumber}) {
	return (
		<form onSubmit={onSubmit}>
			<div>
				name: <input value={name} onChange={changeName} />
			</div>
			<div>
				number:{' '}
				<input
					value={number}
					onChange={changeNumber}
				/>
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	);
}
