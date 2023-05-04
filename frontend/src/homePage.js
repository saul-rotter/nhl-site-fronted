import React, { useMemo, useState, useEffect } from 'react';
import EventTableInstance from './components/eventsTable';
import { Navbar } from './components/Navbar';

function HomePage() {
	return (
		<div>
			<Navbar />
			<EventTableInstance />
		</div>
	);
}

export default HomePage;
