import React, { useMemo } from 'react';
import styled from 'styled-components';
import {
	DropdownFilter,
	SliderColumnFilter,
	TeamDropdownFilter,
} from '../utilities/filters';
import { Players, Player } from './player/PlayerCell';
import BaseTable from './Table';
import { teamColors } from '../utilities/teamColors';
import TeamAvatar from './team/TeamAvatar';

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
	const columns = useMemo(() => [
		{
			Header: 'Events',
			columns: [
				{
					Header: 'Seconds',
					accessor: 'seconds',
					Filter: SliderColumnFilter,
					filter: 'between',
					show: true,
					disableGroupBy: true,
				},
				{
					Header: 'Period',
					accessor: 'period',
					Filter: DropdownFilter,
					show: true,
					disableGroupBy: true,
				},
				{
					Header: 'Game Time',
					accessor: 'time',
					disableFilters: true,
					show: false,
					disableGroupBy: true,
				},
				{
					Header: 'Home Score',
					accessor: 'homeScore',
					Filter: DropdownFilter,
					show: true,
					disableGroupBy: true,
				},
				{
					Header: 'Away Score',
					accessor: 'awayScore',
					Filter: DropdownFilter,
					show: true,
					disableGroupBy: true,
				},
				{
					Header: 'Strength',
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
					Header: 'Event',
					accessor: 'event',
					Filter: DropdownFilter,
					show: true,
					aggregate: 'count',
					Aggregated: ({ value }) => `${value} Events`,
				},

				{
					Header: 'Type',
					accessor: 'type',
					Filter: DropdownFilter,
					show: true,
					aggregate: 'count',
					Aggregated: ({ value }) => `${value} Event Types`,
				},
				{
					Header: 'Team',
					accessor: 'team.name',
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
					Header: 'Player',
					accessor: 'player.name',
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
					Header: 'Opposing Team',
					accessor: 'oppTeam.name',
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
					Header: 'Opposing Player',
					accessor: 'oppPlayer.name',
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
					Header: 'Team on Ice',
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
					Header: 'Opposing Team on Ice',
					accessor: 'opp_team_on_ice',
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
					Header: 'Play Type',
					accessor: 'playType',
					show: false,
				},
				{
					Header: 'Chance',
					accessor: 'chance',
					show: false,
				},
				{
					Header: 'Lane',
					accessor: 'lane',
					show: false,
				},
				{
					Header: 'Oddman',
					accessor: 'oddman',
					show: false,
				},
				{
					Header: 'Primary Assist',
					accessor: 'primaryAssist.name',
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
					Header: 'Primary Lane',
					accessor: 'primaryLane',
					show: false,
				},
				{
					Header: 'Primary Pass Type',
					accessor: 'primaryPassType',
					show: false,
				},
				{
					Header: 'Primary Zone',
					accessor: 'primaryZone',
					show: false,
				},
				{
					Header: 'Secondary Assist',
					accessor: 'secondaryAssist.name',
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
					Header: 'Secondary Lane',
					accessor: 'secondaryLane',
					show: false,
				},
				{
					Header: 'Secondary Pass Type',
					accessor: 'secondaryPassType',
					show: false,
				},
				{
					Header: 'Secondary Zone',
					accessor: 'secondaryZone',
					show: false,
				},
				{
					Header: 'Tertiary Assist',
					accessor: 'tertiaryAssist.name',
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
					Header: 'Tertiary Lane',
					accessor: 'tertiaryprimaryLane',
					show: false,
				},
				{
					Header: 'Tertiary Pass Type',
					accessor: 'tertiaryprimaryPassType',
					show: false,
				},
				{
					Header: 'Tertiary Zone',
					accessor: 'tertiaryprimaryZone',
					show: false,
				},
				{
					Header: 'Recovery',
					accessor: 'recovery.name',
					Cell: ({ row }) => {
						return (
							<PlayerCell row={row} team={'teamId'} player_type={'recovery'} />
						);
					},
					show: false,
				},
				{
					Header: 'Retrieval',
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
	return <Player player={player} backgroundColor={backgroundColor} />;
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
				textShadow: 'white 0px 0px 10px',
			}}>
			<TeamAvatar teamId={team.id} />
			{team.name}
		</span>
	);
};

export default EventTable;
