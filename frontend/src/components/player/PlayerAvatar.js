import React from 'react';
import { Avatar } from '@mui/material';

export default function PlayerAvatar({ playerId }) {
	return (
		<Avatar
			alt='player avatar'
			src={`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${playerId}.jpg`}
		/>
	);
}
