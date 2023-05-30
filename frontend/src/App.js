import React from 'react';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import BasePage from './components/basePage';
import { Container } from 'react-bootstrap';
import { GamePageInstance } from './components/game/gamePage';
// # player images https://cms.nhl.bamgrid.com/images/headshots/current/168x168/{playerId}.jpg

function App() {
	return (
		<div className='App'>
			<Container fluid>
				{/* <ImgMediaCard /> */}
				<Routes>
					<Route path='/' element={<BasePage />}>
						<Route path='/games/:gameId' element={<GamePageInstance />} />
					</Route>
				</Routes>
			</Container>
		</div>
	);
}

export default App;
