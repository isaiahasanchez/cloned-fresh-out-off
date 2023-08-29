import './Home.css';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { checkCount } from '../api/firebase';

export function Home({ setListToken, handleNewToken }) {
	const [inputToken, setInputToken] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		const count = await checkCount(inputToken);
		if (count === 0) {
			setMessage('List not found');
		} else {
			setListToken(inputToken);
			return <Navigate to="/list" />;
		}
	};

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<Link to="/list">
				<button onClick={handleNewToken}>Create a New List</button>
			</Link>
			<form onSubmit={handleSubmit}>
				<label htmlFor="list-token">List Token</label>
				<input
					type="text"
					id="list-token"
					value={inputToken}
					onChange={(event) => setInputToken(event.target.value)}
					required
				/>

				<button type="submit">Submit</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}
