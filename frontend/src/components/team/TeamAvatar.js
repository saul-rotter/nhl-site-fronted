import React from 'react';
import { Avatar, CardMedia } from '@mui/material';
const logoPath = process.env.PUBLIC_URL + '/images/team-logos/';

export default function TeamAvatar({ teamId }) {
	return <CardMedia title='team-avatar' image={`${logoPath}${teamId}.jpg`} />;
}
