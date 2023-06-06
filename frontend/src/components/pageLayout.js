import React from 'react';
import { Paper, Grid } from '@mui/material';

function PageLayout({ topCard, center, footer }) {
	return (
		<Paper
			elevation={2}
			square
			style={{ backgroundColor: '#ffffff', padding: '16px' }}>
			{topCard}
			<Grid
				container
				component={Paper}
				elevation={4}
				square
				style={{ flex: 1, overflow: 'auto', backgroundColor: '#ffffff' }}>
				{center}
			</Grid>
			<Paper
				elevation={0}
				square
				style={{
					backgroundColor: '#ffffff',
					padding: '16px',
					color: '#002D72',
				}}>
				{footer}
			</Paper>
		</Paper>
	);
}

export default PageLayout;
