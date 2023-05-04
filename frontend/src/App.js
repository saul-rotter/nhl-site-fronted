import React from 'react';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './homePage';
import { Container } from 'react-bootstrap';
import {
	useQuery,
	useQueryClient,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import ImgMediaCard from './components/team/TeamCard';
// # player images https://cms.nhl.bamgrid.com/images/headshots/current/168x168/{playerId}.jpg
function App() {
	const client = new QueryClient();
	return (
		<div className='App'>
			<Container fluid>
				{/* <ImgMediaCard /> */}
				<QueryClientProvider client={client}>
					<Routes>
						<Route exact path='/' element={<HomePage />} />
					</Routes>
				</QueryClientProvider>
			</Container>
		</div>
	);
}

export default App;
