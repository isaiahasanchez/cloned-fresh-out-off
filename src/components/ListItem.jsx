import './ListItem.css';
import { updateItem } from '../api/firebase';

export function ListItem({
	name,
	itemId,
	listId,
	dateLastPurchased,
	totalPurchases,
}) {
	// Function to check if the item was purchased within the last 24 hours
	const isPurchased = () => {
		const oneDayInMillis = 24 * 60 * 60 * 1000;

		// If dateLastPurchased exists, check if it was purchased within the last 24 hours
		if (dateLastPurchased) {
			return (
				new Date() - new Date(dateLastPurchased?.seconds * 1000) <=
				oneDayInMillis
			); // Converted dateLastPurchased to milliseconds for comparison
		}

		// Return false if dateLastPurchased does not exist
		return false;
	};

	return (
		<li className="ListItem">
			<label>
				<input
					type="checkbox"
					checked={isPurchased()}
					onChange={() => updateItem(listId, itemId, totalPurchases)}
				/>
				{name}
			</label>
		</li>
	);
}
