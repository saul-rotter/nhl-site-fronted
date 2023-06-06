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
					Header: <Typography>{'Period'}</Typography>,
					accessor: 'period',
					Filter: DropdownFilter,
					show: true,
					disableGroupBy: true,
				},
				{
					id: 'Game Time',
					Header: <Typography>{'Game Time'}</Typography>,
					accessor: 'time',
					disableFilters: true,
					show: true,
					disableGroupBy: true,
				},
				{
					id: 'Home Score',
					Header: <Typography>{'Home Score'}</Typography>,
					accessor: 'homeScore',
					Filter: DropdownFilter,
					show: true,
					disableGroupBy: true,
				},
				{
					Header: <Typography variant='subtitle1'>{'Away Score'}</Typography>,
					id: 'awayScore',
					accessor: 'awayScore',
					Filter: DropdownFilter,
					show: true,
					disableGroupBy: true,
				},
				{
					Header: <Typography>{'Strength'}</Typography>,
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
					Header: <Typography>{'Event'}</Typography>,
					accessor: 'event',
					id: 'event',
					Filter: DropdownFilter,
					show: true,
					aggregate: 'count',
					Aggregated: ({ value }) => `${value} Events`,
				},

				{
					Header: <Typography>{'Type'}</Typography>,
					accessor: 'type',
					id: 'type',
					Filter: DropdownFilter,
					show: true,
					aggregate: 'count',
					Aggregated: ({ value }) => `${value} Event Types`,
				},
				{
					Header: <Typography>{'Team'}</Typography>,
					accessor: 'team.name',
					id: 'team',
					Filter: TeamDropdownFilter,
					show: true,
					Cell: ({ row }) => {
						return <TeamCell row={row} team_type={'team'} />;
					},
					filter: 'fuzzyText',
					aggregate: 'count',
					Aggregated: ({ value }) => `${value} Teams`,
				},
				{
					Header: <Typography>{'Player'}</Typography>,
					accessor: 'player.name',
					id: 'player',
					Cell: ({ row }) => {
						return (
							<PlayerCell row={row} team={'teamId'} player_type={'player'} />
						);
					},
					filter: 'fuzzyText',
					show: true,
					aggregate: 'uniqueCount',
					Aggregated: ({ value }) => `${value} Players`,
				},
				{
					Header: <Typography>{'Opposing Team'}</Typography>,
					accessor: 'oppTeam.name',
					id: 'oppTeam',
					Filter: TeamDropdownFilter,
					show: true,
					aggregate: 'uniqueCount',
					Cell: ({ row }) => {
						return <TeamCell row={row} team_type={'oppTeam'} />;
					},
					filter: 'fuzzyText',
					aggregate: 'count',
					Aggregated: ({ value }) => `${value} Teams`,
				},
				{
					Header: <Typography>{'Opposing Player'}</Typography>,
					accessor: 'oppPlayer.name',
					id: 'oppPlayer',
					Cell: ({ row }) => {
						return (
							<PlayerCell
								row={row}
								team={'oppTeamId'}
								player_type={'oppPlayer'}
							/>
						);
					},
					filter: 'fuzzyText',
					show: true,
					aggregate: 'uniqueCount',
					Aggregated: ({ value }) => `${value} Players`,
				},
				{
					Header: <Typography>{'Team on Ice'}</Typography>,
					id: 'team_on_ice',
					accessor: 'team_on_ice',
					Cell: ({ cell: { row, value } }) => {
						let backgroundColor = teamColors[row.original['team']['id']];
						return <Players values={value} backgroundColor={backgroundColor} />;
					},
					filter: 'fuzzyList',
					show: false,
					disableGroupBy: true,
					Aggregated: () => ``,
				},
				{
					Header: <Typography>{'Opposing Team on Ice'}</Typography>,
					accessor: 'opp_team_on_ice',
					id: 'opp_team_on_ice',
					Cell: ({ cell: { row, value } }) => {
						let backgroundColor = teamColors[row.original['oppTeam']['id']];
						return <Players values={value} backgroundColor={backgroundColor} />;
					},
					filter: 'fuzzyList',
					show: false,
					disableGroupBy: true,
					Aggregated: ({ value }) => ``,
				},
				{
					Header: <Typography>{'Play Type'}</Typography>,
					accessor: 'playType',
					id: 'playType',
					show: false,
				},
				{
					Header: <Typography>{'Chance'}</Typography>,
					accessor: 'chance',
					id: 'chance',
					show: false,
				},
				{
					Header: <Typography>{'Lane'}</Typography>,
					accessor: 'lane',
					id: 'lane',
					show: false,
				},
				{
					Header: <Typography>{'Oddman'}</Typography>,
					accessor: 'oddman',
					id: 'oddman',
					show: false,
				},
				{
					Header: <Typography>{'Primary Assist'}</Typography>,
					accessor: 'primaryAssist.name',
					id: 'primaryAssist',
					Cell: ({ row }) => {
						return (
							<PlayerCell
								row={row}
								team={'teamId'}
								player_type={'primaryAssist'}
							/>
						);
					},
					show: false,
				},
				{
					Header: <Typography>{'Primary Lane'}</Typography>,
					accessor: 'primaryLane',
					id: 'primaryLane',
					show: false,
				},
				{
					Header: <Typography>{'Primary Pass Type'}</Typography>,
					accessor: 'primaryPassType',
					id: 'primaryPassType',
					show: false,
				},
				{
					Header: <Typography>{'Primary Zone'}</Typography>,
					accessor: 'primaryZone',
					id: 'primaryZone',
					show: false,
				},
				{
					Header: <Typography>{'Secondary Assist'}</Typography>,
					accessor: 'secondaryAssist.name',
					id: 'secondaryAssist',
					Cell: ({ row }) => {
						return (
							<PlayerCell
								row={row}
								team={'teamId'}
								player_type={'secondaryAssist'}
							/>
						);
					},
					show: false,
				},
				{
					Header: <Typography>{'Secondary Lane'}</Typography>,
					accessor: 'secondaryLane',
					id: 'secondaryLane',
					show: false,
				},
				{
					Header: <Typography>{'Secondary Pass Type'}</Typography>,
					accessor: 'secondaryPassType',
					id: 'secondaryPassType',
					show: false,
				},
				{
					Header: <Typography>{'Secondary Zone'}</Typography>,
					accessor: 'secondaryZone',
					id: 'secondaryZone',
					show: false,
				},
				{
					Header: <Typography>{'Tertiary Assist'}</Typography>,
					accessor: 'tertiaryAssist.name',
					id: 'tertiaryAssist',
					Cell: ({ row }) => {
						return (
							<PlayerCell
								row={row}
								team={'teamId'}
								player_type={'tertiaryAssist'}
							/>
						);
					},
					show: false,
				},
				{
					Header: <Typography>{'Tertiary Lane'}</Typography>,
					accessor: 'tertiaryLane',
					id: 'tertiaryLane',
					show: false,
				},
				{
					Header: <Typography>{'Tertiary Pass Type'}</Typography>,
					accessor: 'tertiaryPassType',
					id: 'tertiaryPassType',
					show: false,
				},
				{
					Header: <Typography>{'Tertiary Zone'}</Typography>,
					accessor: 'tertiaryprimaryZone',
					id: 'tertiaryprimaryZone',
					show: false,
				},
				{
					Header: <Typography>{'Recovery'}</Typography>,
					accessor: 'recovery.name',
					Cell: ({ row }) => {
						return (
							<PlayerCell row={row} team={'teamId'} player_type={'recovery'} />
						);
					},
					show: false,
				},
				{
					Header: <Typography>{'Retrieval'}</Typography>,
					accessor: 'retrieval.name',
					Cell: ({ row }) => {
						return (
							<PlayerCell row={row} team={'teamId'} player_type={'retrieval'} />
						);
					},
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

const PlayerCell = ({ row, team, player_type }) => {
	let backgroundColor;
	let player;
	if (row.isGrouped) {
		backgroundColor = teamColors[row.leafRows[0].original[team]];
		player = row.leafRows[0].original[player_type];
	} else {
		backgroundColor = teamColors[row.original[team]];
		player = row.original[player_type];
	}
	return (
		<PlayerCellInstance player={player} backgroundColor={backgroundColor} />
	);
};

const TeamCell = ({ row, team_type }) => {
	let backgroundColor;
	let team;
	if (row.isGrouped) {
		team = row.leafRows[0].original[team_type];
		console.log(team);
		backgroundColor = teamColors[row.leafRows[0].original[team_type].id];
	} else {
		team = row.original[team_type];
		backgroundColor = teamColors[row.original[team_type].id];
	}
	return (
		<span
			className='badge'
			style={{
				backgroundColor: backgroundColor,
			}}>
			<TeamAvatar teamId={team.id} />
			{<Typography variant='caption'> {team.name}</Typography>}
		</span>
	);
};

export default EventTable;
