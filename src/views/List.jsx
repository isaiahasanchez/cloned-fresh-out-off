import { ListItem } from '../components';

export function List({ data }) {
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<ul>
				{
					/**
					 * -key={item.id}
					 * TODO: write some JavaScript that renders the `data` array
					 * using the `ListItem` component that's imported at the top
					 * of this file.
					 */
					// data.map(item => (
					// 	item.name
					// ))
					data.map((item, index) => (
						<ListItem key={index} name={item.name} />
					))
				}
			</ul>
		</>
	);
}
