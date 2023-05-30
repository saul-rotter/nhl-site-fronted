import React, { useMemo, useState, useEffect } from 'react';
import EventTableInstance from './eventsTable';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export const client = new QueryClient();
function BasePage() {
	return (
		<div>
			<QueryClientProvider client={client} contextSharing={true}>
				<Navbar />
				<Outlet />
			</QueryClientProvider>
		</div>
	);
}

export default BasePage;
