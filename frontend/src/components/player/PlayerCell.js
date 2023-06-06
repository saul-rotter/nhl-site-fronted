import React from 'react';
import PlayerAvatar from './PlayerAvatar';
import { Box, Popover, Typography } from '@mui/material';
import { teamColors } from '../../utilities/teamColors';
import GPTPlayerCard from './GPTPlayerCard';

// Custom component to render Players
export const Players = ({ values, backgroundColor }) => {
	// Loop through the array and create a badge-like component instead of a comma-separated string
	return (
		<>
			{values.map((player, idx) => {
				return <Player player={player} backgroundColor={backgroundColor} />;
			})}
		</>
	);
};

export const PlayerCellInstance = ({ player }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);
	let name = '';
	let card = <div></div>;
	if (player !== null) {
		name = player['name'];
		card = <GPTPlayerCard player={player} />;
	}
	return (
		<div>
			<Typography
				aria-owns={open ? 'mouse-over-popover' : undefined}
				aria-haspopup='true'
				onMouseEnter={handlePopoverOpen}
				onMouseLeave={handlePopoverClose}>
				{name}
			</Typography>
			<Popover
				id='mouse-over-popover'
				sx={{
					pointerEvents: 'none',
				}}
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				onClose={handlePopoverClose}
				disableRestoreFocus>
				{card}
			</Popover>
		</div>
	);
};

export const Player = ({ player, backgroundColor }) => {
	let name = '';
	let avatar = '';
	if (player !== null) {
		name = player['name'];
		avatar = <PlayerAvatar playerId={player['id']} />;
	}
	return (
		<Box
			component='span'
			key={name}
			className='badge'
			sx={{
				backgroundColor: backgroundColor,
				textShadow: 'white 0px 0px 10px',
			}}>
			{avatar}
			{name}
		</Box>
	);
};

// const PlayerCellInstance = ({ row, team, player_type }) => {
// 	let backgroundColor;
// 	let player;
// 	if (row.isGrouped) {
// 		backgroundColor = teamColors[row.leafRows[0].original[team]];
// 		player = row.leafRows[0].original[player_type];
// 	} else {
// 		backgroundColor = teamColors[row.original[team]];
// 		player = row.original[player_type];
// 	}
// 	return (
// 		<PlayerCellInstance player={player} backgroundColor={backgroundColor} />
// 	);
// };

// {
//         Header: 'Name',
//         accessor: 'name',
//         Cell: ({ row }) => (
//           <Tooltip title={row.original.name} placement="top">
//             <Avatar alt={row.original.name} src={row.original.avatarUrl} />
//           </Tooltip>
//         ),
//       },
