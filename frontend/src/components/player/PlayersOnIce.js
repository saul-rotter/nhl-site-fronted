import React from 'react';
import {
	Tooltip,
	Collapse,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
} from '@mui/material';
import GPTPlayerCard from './GPTPlayerCard';
const PlayersOnIce = ({ row }) => {
	<>
		<Tooltip title='Expand' placement='top'>
			<span
				style={{ cursor: 'pointer', textDecoration: 'underline' }}
				onClick={() => setExpandedRow(row.id === expandedRow ? null : row.id)}>
				{row.original.friends.length} friend(s)
			</span>
		</Tooltip>
		<Collapse in={row.id === expandedRow} timeout='auto' unmountOnExit>
			<List>
				{row.original.friends.map((friend) => (
					<ListItem key={friend.id}>
						<ListItemAvatar>
							<Avatar alt={friend.name} src={friend.avatarUrl} />
						</ListItemAvatar>
						<ListItemText primary={friend.name} secondary={friend.email} />
					</ListItem>
				))}
			</List>
		</Collapse>
	</>;
};
export default PlayersOnIce;
// {
//         Header: 'Friends',
//         accessor: 'friends',
//         Cell: ({ row }) => (

//         ),
//       },
