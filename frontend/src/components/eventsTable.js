import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import {
	DropdownFilter,
	SliderColumnFilter,
	TeamDropdownFilter,
} from '../utilities/filters';
import { Players, Player, PlayerCellInstance } from './player/PlayerCell';
import BaseTable from './Table';
import { teamColors } from '../utilities/teamColors';
import TeamAvatar from './team/TeamAvatar';
import { Typography } from '@mui/material';

const Styles = styled.div`
	.badge {
		font-size: 8px;
		font-weight: bold;
		text-transform: uppercase;
	}
	.team-card {
		border-radius: 8px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		transition: background-color 0.3s ease;
	}

	.team-1 {
		color: #fff;
	}

	.team-2 {
		color: #fff;
	}
`;
const EventTable = ({ eventTableData }) => {
	const [expandedRow, setExpandedRow] = useState(null);
	const columns = useMemo(() => [
		{
			id: 'Events',
			Header: <Typography>{'Events'}</Typography>,
			columns: [
				{
					id: 'Period',
					Header: <Typography variant='subtitle2'>{'Period'}</Typography>,
					accessor: 'period',
					Filter: DropdownFilter,
					show: true,
					disableGroupBy: true,
				},
				{
					id: 'Game Time',
					Header: <Typography variant='subtitle2'>{'Game Time'}</Typography>,
					accessor: 'time',
					disableFilters: true,
					show: true,
					disableGroupBy: true,
				},
				{
					id: 'Home Score',
					Header: <Typography variant='subtitle2'>{'Home Score'}</Typography>,
					accessor: 'homeScore',
					Filter: DropdownFilter,
					show: true,
					disableGroupBy: true,
				},
				{
					Header: <Typography variant='subtitle2'>{'Away Score'}</Typography>,
					id: 'awayScore',
					accessor: 'awayScore',
					Filter: DropdownFilter,
					show: true,
					disableGroupBy: true,
				},
				{
					Header: <Typography variant='subtitle2'>{'Strength'}</Typography>,
					id: 'strength',
					accessor: (row) => {
						let team_on_ice = row.team_on_ice;
						let opp_team_on_ice = row.opp_team_on_ice;
						if (team_on_ice === undefined || opp_team_on_ice === undefined) {
							return <div></div>;
						}
						return team_on_ice.length + 'v' + opp_team_on_ice.length;
					},
					Filter: DropdownFilter,
					show: true,
				},
				{
					Header: <Typography variant='subtitle2'>{'Event'}</Typography>,
					accessor: 'event',
					id: 'event',
					Filter: DropdownFilter,
					show: true,
					aggregate: 'count',
					Aggregated: ({ value }) => `${value} Events`,
				},

				{
					Header: <Typography variant='subtitle2'>{'Type'}</Typography>,
					accessor: 'type',
					id: 'type',
					Filter: DropdownFilter,
					show: true,
					aggregate: 'count',
					Aggregated: ({ value }) => `${value} Event Types`,
				},
				{
					Header: <Typography variant='subtitle2'>{'Team'}</Typography>,
					accessor: 'team.name',
					id: 'team',
					Filter: TeamDropdownFilter,
					show: true,
					aggregate: 'count',
					Aggregated: ({ value }) => `${value} Teams`,
				},
				{
					Header: <Typography variant='subtitle2'>{'Player'}</Typography>,
					accessor: 'player.name',
					id: 'player',
					show: true,
					aggregate: 'uniqueCount',
					Aggregated: ({ value }) => `${value} Players`,
				},
				{
					Header: (
						<Typography variant='subtitle2'>{'Opposing Team'}</Typography>
					),
					accessor: 'oppTeam.name',
					id: 'oppTeam',
					Filter: TeamDropdownFilter,
					show: true,
					aggregate: 'uniqueCount',
					aggregate: 'count',
					Aggregated: ({ value }) => `${value} Teams`,
				},
				{
					Header: (
						<Typography variant='subtitle2'>{'Opposing Player'}</Typography>
					),
					accessor: 'oppPlayer.name',
					id: 'oppPlayer',
					show: true,
					aggregate: 'uniqueCount',
					Aggregated: ({ value }) => `${value} Players`,
				},
				{
					Header: <Typography variant='subtitle2'>{'Team on Ice'}</Typography>,
					id: 'team_on_ice',
					accessor: 'team_on_ice',
					Cell: ({ cell: { row, value } }) => {
						let backgroundColor = teamColors[row.original['team']['id']];
						return <Players values={value} backgroundColor={backgroundColor} />;
					},
					filter: 'fuzzyList',
					disableGroupBy: true,
					Aggregated: () => ``,
				},
				{
					Header: (
						<Typography variant='subtitle2'>
							{'Opposing Team on Ice'}
						</Typography>
					),
					accessor: 'opp_team_on_ice',
					id: 'opp_team_on_ice',
					Cell: ({ cell: { row, value } }) => {
						let backgroundColor = teamColors[row.original['oppTeam']['id']];
						return <Players values={value} backgroundColor={backgroundColor} />;
					},
					filter: 'fuzzyList',
					disableGroupBy: true,
					Aggregated: ({ value }) => ``,
				},
				{
					Header: <Typography variant='subtitle2'>{'Play Type'}</Typography>,
					accessor: 'playType',
					id: 'playType',
					show: false,
				},
				{
					Header: (
						<Typography variant='subtitle2' y>
							{'Chance'}
						</Typography>
					),
					accessor: 'chance',
					id: 'chance',
					show: false,
				},
				{
					Header: <Typography variant='subtitle2'>{'Lane'}</Typography>,
					accessor: 'lane',
					id: 'lane',
					show: false,
				},
				{
					Header: <Typography variant='subtitle2'>{'Oddman'}</Typography>,
					accessor: 'oddman',
					id: 'oddman',
					show: false,
				},
				// {
				// 	Header: (
				// 		<Typography variant='subtitle2'>{'Primary Assist'}</Typography>
				// 	),
				// 	accessor: 'primaryAssist.name',
				// 	id: 'primaryAssist',
				// 	disableGroupBy: true,
				// 	show: false,
				// },
				// {
				// 	Header: <Typography variant='subtitle2'>{'Primary Lane'}</Typography>,
				// 	accessor: 'primaryLane',
				// 	id: 'primaryLane',
				// 	show: false,
				// },
				// {
				// 	Header: (
				// 		<Typography variant='subtitle2'>{'Primary Pass Type'}</Typography>
				// 	),
				// 	accessor: 'primaryPassType',
				// 	id: 'primaryPassType',
				// 	show: false,
				// },
				// {
				// 	Header: <Typography variant='subtitle2'>{'Primary Zone'}</Typography>,
				// 	accessor: 'primaryZone',
				// 	id: 'primaryZone',
				// 	show: false,
				// },
				// {
				// 	Header: (
				// 		<Typography variant='subtitle2'>{'Secondary Assist'}</Typography>
				// 	),
				// 	accessor: 'secondaryAssist.name',
				// 	id: 'secondaryAssist',
				// 	disableGroupBy: true,
				// 	show: false,
				// },
				// {
				// 	Header: (
				// 		<Typography variant='subtitle2'>{'Secondary Lane'}</Typography>
				// 	),
				// 	accessor: 'secondaryLane',
				// 	id: 'secondaryLane',
				// 	show: false,
				// },
				// {
				// 	Header: (
				// 		<Typography variant='subtitle2'>{'Secondary Pass Type'}</Typography>
				// 	),
				// 	accessor: 'secondaryPassType',
				// 	id: 'secondaryPassType',
				// 	show: false,
				// },
				// {
				// 	Header: (
				// 		<Typography variant='subtitle2'>{'Secondary Zone'}</Typography>
				// 	),
				// 	accessor: 'secondaryZone',
				// 	id: 'secondaryZone',
				// 	show: false,
				// },
				// {
				// 	Header: (
				// 		<Typography variant='subtitle2'>{'Tertiary Assist'}</Typography>
				// 	),
				// 	accessor: 'tertiaryAssist.name',
				// 	id: 'tertiaryAssist',
				// 	disableGroupBy: true,
				// 	show: false,
				// },
				// {
				// 	Header: (
				// 		<Typography variant='subtitle2'>{'Tertiary Lane'}</Typography>
				// 	),
				// 	accessor: 'tertiaryLane',
				// 	id: 'tertiaryLane',
				// 	show: false,
				// },
				// {
				// 	Header: (
				// 		<Typography variant='subtitle2'>{'Tertiary Pass Type'}</Typography>
				// 	),
				// 	accessor: 'tertiaryPassType',
				// 	id: 'tertiaryPassType',
				// 	show: false,
				// },
				// {
				// 	Header: (
				// 		<Typography variant='subtitle2'>{'Tertiary Zone'}</Typography>
				// 	),
				// 	accessor: 'tertiaryprimaryZone',
				// 	id: 'tertiaryprimaryZone',
				// 	show: false,
				// },
				{
					Header: <Typography variant='subtitle2'>{'Recovery'}</Typography>,
					accessor: 'recovery.name',
					show: false,
				},
				{
					Header: <Typography variant='subtitle2'>{'Retrieval'}</Typography>,
					accessor: 'retrieval.name',
					show: false,
				},
			],
		},
	]);
	return (
		<Styles>
			<BaseTable
				columns={columns}
				data={eventTableData}
				shouldPaginate={true}
			/>
		</Styles>
	);
};

// const PlayerCell = ({ row, team, player_type }) => {
// 	let backgroundColor;
// 	let player;
// 	if (row.isGrouped) {
// 		backgroundColor = teamColors[row.leafRows[0].original[team]];
// 		player = row.leafRows[0].original[player_type];
// 	} else {
// 		backgroundColor = teamColors[row.original[team]];
// 		player = row.original[player_type];
// 	}
// 	return (
// 		<PlayerCellInstance player={player} backgroundColor={backgroundColor} />
// 	);
// };

// const TeamCell = ({ row, team_type }) => {
// 	let backgroundColor;
// 	let team;
// 	if (row.isGrouped) {
// 		team = row.leafRows[0].original[team_type];
// 		console.log(team);
// 		backgroundColor = teamColors[row.leafRows[0].original[team_type].id];
// 	} else {
// 		team = row.original[team_type];
// 		backgroundColor = teamColors[row.original[team_type].id];
// 	}
// 	return (
// 		<span
// 			className='badge'
// 			style={{
// 				backgroundColor: backgroundColor,
// 			}}>
// 			<TeamAvatar teamId={team.id} />
// 			{<Typography variant='caption'> {team.name}</Typography>}
// 		</span>
// 	);
// };

export default EventTable;
