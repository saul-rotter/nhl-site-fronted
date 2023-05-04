import React from 'react';
import PlayerAvatar from './player/PlayerAvatar';

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

export const Player = ({ player, backgroundColor }) => {
	let name = '';
	let avatar = '';
	if (player !== null) {
		name = player['name'];
		avatar = <PlayerAvatar playerId={player['id']} />;
	}
	return (
		<span
			key={name}
			className='badge'
			style={{
				backgroundColor: backgroundColor,
				textShadow: 'white 0px 0px 10px',
			}}>
			{avatar}
			{name}
		</span>
	);
};
