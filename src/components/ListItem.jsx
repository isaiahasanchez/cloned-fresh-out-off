import { useState } from 'react';
import './ListItem.css';
import { ONE_DAY_IN_MILLISECONDS, getDaysBetweenDates } from '../utils';
import { deleteItem, updateItem } from '../api/firebase';
import { useState } from 'react';

export function ListItem({ item, listId }) {

	const [error, setError] = useState('');
	const { name, id, dateLastPurchased } = item;
	const [isChecked, setIsChecked] = useState(
		Date.now() - dateLastPurchased?.toMillis() < ONE_DAY_IN_MILLISECONDS ||
			false,
	);

	const toggleCheckBox = () => {
		// Toggle the checked state
		setIsChecked(!isChecked);

		// Conditionally call updateItem based on the checked state
		if (!isChecked) {
			updateItem(listId, item);
		}
	};

	function determineItemIndicator(item) {
		const now = new Date();
		if (
			item.dateLastPurchased &&
			getDaysBetweenDates(item.dateLastPurchased.toDate(), now) > 60
		) {
			return 'inactive';
		}
		const days = getDaysBetweenDates(now, item.dateNextPurchased.toDate());
		if (days < 0) {
			return 'overdue';
		} else if (days <= 7) {
			return 'soon';
		} else if (days > 7 && days <= 30) {
			return 'kind of soon';
		} else {
			return 'not soon';
		}
	}
	const indicatorClass = `indicator-${determineItemIndicator(item).replaceAll(
		' ',
		'-',
	)}`;

	const handleUpdate = async () => {
		const error = await updateItem(listId, item);
		if (error) {
			setError('Error updating the item. Please try again.');
			setTimeout(() => setError(''), 5000); // Clear error after 5 seconds
		}
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		if (window.confirm(`Do you really want to delete ${name}?`)) {
			const error = await deleteItem(listId, id);
			if (error) {
				setError('Error deleting the item. Please try again.');
				setTimeout(() => setError(''), 5000); // Clear error after 5 seconds
			}
		}
	};

	return (
		<li className={`ListItem ${indicatorClass}`}>
			<label>
				<input
					type="checkbox"
					checked={isChecked}
					onChange={() => toggleCheckBox()}
				/>
				{name}
				<span>{determineItemIndicator(item)}</span>
			</label>
			<button onClick={handleDelete}>Delete</button>
			{error && <p className="error-message">{error}</p>}{' '}
			{/* Display error message */}
		</li>
	);
}
