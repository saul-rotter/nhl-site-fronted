import React, { useMemo, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styled from 'styled-components';
import {
	DropdownFilter,
	DefaultColumnFilter,
	NumberRangeColumnFilter,
	TextSearchFilter,
	fuzzyTextFilterFn,
	fuzzyListFilterFn,
	SliderColumnFilter,
	TeamDropdownFilter,
} from '../utilities/filters';
import { useTable, useFilters, usePagination } from 'react-table';
import { Players, Player } from './PlayerCell';
import BaseTable from './Table';
import { teamColors } from '../utilities/teamColors';
import TeamAvatar from './team/TeamAvatar';

const IndeterminateCheckbox = React.forwardRef(
	({ indeterminate, ...rest }, ref) => {
		const defaultRef = React.useRef();
		const resolvedRef = ref || defaultRef;

		React.useEffect(() => {
			resolvedRef.current.indeterminate = indeterminate;
		}, [resolvedRef, indeterminate]);

		return <input type='checkbox' ref={resolvedRef} {...rest} />;
	}
);

const Styles = styled.div`
	.badge {
		background-color: #9ae6b4;
		font-size: 8px;
		font-weight: bold;
		text-transform: uppercase;
	}
`;

const EventTableInstance = () => {
	const [tableData, setTableData] = useState();
	const { data: apiResponse, isLoading } = useQuery(['games'], () => {
		return axios.get(`http://127.0.0.1:4999/games/`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	});
	useEffect(() => {
		setTableData(apiResponse);
	}, [apiResponse]);
	if (isLoading || !tableData) {
		return <div>Loading...</div>;
	}
	return <EventTable eventTableData={tableData.data.events} />;
};

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
				},
				{
					Header: 'Period',
					accessor: 'period',
					Filter: DropdownFilter,
					show: true,
				},
				{
					Header: 'Game Time',
					accessor: 'time',
					disableFilters: true,
					show: false,
				},
				{
					Header: 'Home Score',
					accessor: 'homeScore',
					Filter: DropdownFilter,
					show: true,
				},
				{
					Header: 'Away Score',
					accessor: 'awayScore',
					Filter: DropdownFilter,
					show: true,
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
				},

				{
					Header: 'Type',
					accessor: 'type',
					Filter: DropdownFilter,
					show: true,
				},
				{
					Header: 'Team',
					accessor: 'team',
					Filter: TeamDropdownFilter,
					show: true,
					Cell: ({ cell: { value } }) => {
						return (
							<span
								className='badge'
								style={{
									backgroundColor: teamColors[value['id']],
									textShadow: 'white 0px 0px 10px',
								}}>
								<TeamAvatar teamId={value['id']} />
								{value['name']}
							</span>
						);
					},
					filter: 'fuzzyText',
				},
				{
					Header: 'Player',
					accessor: 'player',
					Cell: ({ cell: { row, value } }) => {
						let backgroundColor = teamColors[row.values['team']['id']];
						return <Player player={value} backgroundColor={backgroundColor} />;
					},
					filter: 'fuzzyText',
					show: true,
				},
				{
					Header: 'Opposing Team',
					accessor: 'oppTeam',
					Filter: TeamDropdownFilter,
					show: true,
					Cell: ({ cell: { value } }) => {
						return (
							<span
								className='badge'
								style={{
									backgroundColor: teamColors[value['id']],
									textShadow: 'white 0px 0px 10px',
								}}>
								<TeamAvatar teamId={value['id']} />
								{value['name']}
							</span>
						);
					},
					filter: 'fuzzyText',
				},
				{
					Header: 'Opposing Player',
					accessor: 'oppPlayer',
					Cell: ({ cell: { row, value } }) => {
						let backgroundColor = teamColors[row.values['oppTeam']['id']];
						return <Player player={value} backgroundColor={backgroundColor} />;
					},
					filter: 'fuzzyText',
					show: true,
				},
				{
					Header: 'Opposing Team on Ice',
					accessor: 'opp_team_on_ice',
					Cell: ({ cell: { row, value } }) => {
						let backgroundColor = teamColors[row.values['oppTeam']['id']];
						return <Players values={value} backgroundColor={backgroundColor} />;
					},
					filter: 'fuzzyList',
					show: false,
				},
				{
					Header: 'Team on Ice',
					accessor: 'team_on_ice',
					Cell: ({ cell: { row, value } }) => {
						let backgroundColor = teamColors[row.values['team']['id']];
						return <Players values={value} backgroundColor={backgroundColor} />;
					},
					filter: 'fuzzyList',
					show: false,
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
					accessor: 'primaryAssist',
					Cell: ({ row, value }) => {
						let backgroundColor = teamColors[row.values['team']['id']];
						return <Player player={value} backgroundColor={backgroundColor} />;
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
					accessor: 'secondaryAssist',
					Cell: ({ row, value }) => {
						let backgroundColor = teamColors[row.values['team']['id']];
						return <Player player={value} backgroundColor={backgroundColor} />;
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
					accessor: 'tertiaryAssist',
					Cell: ({ row, value }) => {
						let backgroundColor = teamColors[row.values['team']['id']];
						return <Player player={value} backgroundColor={backgroundColor} />;
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
					accessor: 'recovery',
					Cell: ({ row, value }) => {
						let backgroundColor = teamColors[row.values['team']['id']];
						return <Player player={value} backgroundColor={backgroundColor} />;
					},
					show: false,
				},
				{
					Header: 'Retrieval',
					accessor: 'retrieval',
					Cell: ({ row, value }) => {
						let backgroundColor = teamColors[row.values['team']['id']];
						return <Player player={value} backgroundColor={backgroundColor} />;
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

export default EventTableInstance;
