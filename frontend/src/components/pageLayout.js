import React from 'react';
import { Paper, Grid } from '@mui/material';

function PageLayout({ topCard, center, footer }) {
	return (
		<Paper
			elevation={2}
			square
			style={{
				backgroundColor: '#ffffff',
				padding: '16px',
				borderRadius: '8px' // Added border radius
			}}
		>
			{topCard}

			<Grid
				container
				component={Paper}
				elevation={4}
				square
				style={{
					flex: 1,
					overflow: 'auto',
					backgroundColor: '#ffffff',
					borderRadius: '8px' // Added border radius
				}}
			>
				{center}
			</Grid>

			<Paper
				elevation={0}
				square
				style={{
					backgroundColor: '#ffffff',
					padding: '16px',
					color: '#002D72',
					borderRadius: '8px' // Added border radius
				}}
			>
				{footer}
			</Paper>
		</Paper>
	);
}


export default PageLayout;
