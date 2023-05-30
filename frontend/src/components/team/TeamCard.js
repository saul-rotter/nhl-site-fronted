import React from 'react';
import {
	Card,
	CardHeader,
	Typography,
	Collapse,
	CardContent,
} from '@mui/material';
import TeamAvatar from './TeamAvatar';
import { ExpandLess, ExpandMore } from '@mui/icons-material/';
import { teamColors } from '../../utilities/teamColors';

/* <Avatar alt='player face' src={`${iconPath}2.jpg`} />; */
// src =
// 	'https://cms.nhl.bamgrid.com/images/headshots/current/168x168/{playerId}.jpg';
export default function TeamCard({ className, teamData }) {
	return (
		<Card
			className={className}
			sx={{ backgroundColor: teamColors[teamData['id']] }}>
			<CardHeader
				title={teamData['name']}
				avatar={<TeamAvatar teamId={teamData['id']} />}
			/>
			<CardContent>
				<Typography variant='body2' component='p'>
					Final Score: {teamData.score}
				</Typography>
				<Typography variant='body2' component='p'>
					Head Coach: {teamData.coach}
				</Typography>
			</CardContent>
		</Card>
	);
}
//   return (
// 		<div>
// 			{isLoading ? (
// 				<div>Loading...</div>
// 			) : isError ? (
// 				<div>Error: {error.message}</div>
// 			) : (
// 				<div>
// 					{data.projects.map((project) => (
// 						<p key={project.id}>{project.name}</p>
// 					))}
// 				</div>
// 			)}
// 			<span>Current Page: {page + 1}</span>
// 			<button
// 				onClick={() => setPage((old) => Math.max(old - 1, 0))}
// 				disabled={page === 0}>
// 				Previous Page
// 			</button>{' '}
// 			<button
// 				onClick={() => {
// 					if (!isPreviousData && data.hasMore) {
// 						setPage((old) => old + 1);
// 					}
// 				}}
// 				// Disable the Next Page button until we know a next page is available
// 				disabled={isPreviousData || !data?.hasMore}>
// 				Next Page
// 			</button>
// 			{isFetching ? <span> Loading...</span> : null}{' '}
// 		</div>
// 	);
