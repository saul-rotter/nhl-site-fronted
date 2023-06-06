import React, { useMemo, useState, useEffect } from 'react';
import EventTableInstance from './eventsTable';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Container, ThemeProvider, createTheme } from '@mui/material';
export const client = new QueryClient();
const theme = createTheme({
	palette: {},
	typography: {
		fontFamily: 'Arial',
		fontWeight: 700,
		h5: {
			fontWeight: 700,
			marginBottom: '16px',
		},
		h6: {
			fontWeight: 700,
		},
		subtitle1: {
			fontWeight: 700,
		},
		caption: {
			fontSize: '0.9rem',
		},
	},
});
function BasePage() {
	return (
		<QueryClientProvider client={client} contextSharing={true}>
			<ThemeProvider theme={theme}>
				<Container
					style={{
						minHeight: '100vh',
						padding: '16px',
					}}>
					<Navbar />
					<Outlet />
				</Container>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default BasePage;
