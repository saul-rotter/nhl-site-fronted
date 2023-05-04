import React from 'react';
import { Avatar } from '@mui/material';
const logoPath = process.env.PUBLIC_URL + '/images/team-logos/';

export default function TeamAvatar({ teamId }) {
	return <Avatar alt='team avatar' src={`${logoPath}${teamId}.jpg`} />;
}
