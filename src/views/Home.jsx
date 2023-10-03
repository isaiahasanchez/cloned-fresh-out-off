import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { checkCount } from '../api/firebase';

export function Home({ setListToken, handleNewToken }) {
	const [inputToken, setInputToken] = useState('');
	const [tokenNotFoundMessage, setTokenNotFoundMessage] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const count = await checkCount(inputToken);
		if (count === 0) {
			setTokenNotFoundMessage('List not found');
			setInputToken(''); // Clear the input field
		} else {
			setListToken(inputToken);
			navigate('/list'); // Use the `navigate` function to navigate to '/list'
		}
	};

	return (
		<div className="Home">
			<p>Let's get started with a new shopping list!</p>
			<p className="spacer"></p> {/* Adds more space below the text */}
			<div className="centered-container">
				<Link to="/list">
					<button className="button-medium" onClick={handleNewToken}>
						Create a New List
					</button>
				</Link>
				<p className="spacer"></p>{' '}
				{/* Adds space below the "Create a New List" button */}
				<p className="or-text">-or-</p> {/* Adds a class for styling "-or-" */}
				<p className="spacer"></p> {/* Adds space below "-or-" */}
				{tokenNotFoundMessage && <p>{tokenNotFoundMessage}</p>}
				<form onSubmit={handleSubmit}>
					<label htmlFor="list-token">
						Enter a token below to join an existing list
					</label>
					<input
						type="text"
						id="list-token"
						placeholder="Start typing here.."
						value={inputToken}
						onChange={(event) => setInputToken(event.target.value)}
						required
					/>
					<p className="spacer"></p>{' '}
					{/* Adds space above the "Join List" button */}
					<button className="button-medium" type="submit">
						Join List
					</button>
				</form>
			</div>
		</div>
	);
}
