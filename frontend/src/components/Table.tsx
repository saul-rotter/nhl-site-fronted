import React from 'react';
import {
	useTable,
	useFilters,
	usePagination,
	useGroupBy,
	useExpanded,
} from 'react-table';
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Paper,
} from '@mui/material';
import {
	DefaultColumnFilter,
	fuzzyTextFilterFn,
	fuzzyListFilterFn,
} from '../utilities/filters';
import { Stack } from '@mui/material';
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
const BaseTable = ({ columns, data, shouldPaginate }) => {
	const filterTypes = React.useMemo(
		() => ({
			// Add a new fuzzyTextFilterFn filter type.
			fuzzyText: fuzzyTextFilterFn,
			fuzzyList: fuzzyListFilterFn,
		}),
		[]
	);
	const defaultColumn = React.useMemo(
		() => ({
			// Let's set up our default Filter UI
			Filter: DefaultColumnFilter,
		}),
		[]
	);
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		allColumns,
		getToggleHideAllColumnsProps,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			defaultColumn,
			filterTypes,
			initialState: {
				hiddenColumns: columns[0].columns.map((column) => {
					if (column.show === false) return column.accessor || column.id;
				}),
				pageSize: 5,
			},
		},
		useFilters,
		useGroupBy,
		useExpanded,
		usePagination
	);
	let pagination = <></>;
	if (shouldPaginate) {
		pagination = (
			<div className='pagination'>
				<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
					{'<<'}
				</button>{' '}
				<button onClick={() => previousPage()} disabled={!canPreviousPage}>
					{'<'}
				</button>{' '}
				<button onClick={() => nextPage()} disabled={!canNextPage}>
					{'>'}
				</button>{' '}
				<button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
					{'>>'}
				</button>{' '}
				<span>
					Page{' '}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{' '}
				</span>
				<span>
					| Go to page:{' '}
					<input
						type='number'
						defaultValue={pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0;
							gotoPage(page);
						}}
						style={{ width: '100px' }}
					/>
				</span>{' '}
				<select
					value={pageSize}
					onChange={(e) => {
						setPageSize(Number(e.target.value));
					}}>
					{[5, 10, 25, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
		);
	}
	return (
		<>
			<TableContainer sx={{ display: 'flex' }} component={Paper}>
				<Table stickyHeader {...getTableProps()} size='small'>
					<TableHead>
						{headerGroups.map((headerGroup) => (
							<TableRow {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<TableCell {...column.getHeaderProps()}>
										{column.canGroupBy ? (
											// If the column can be grouped, let's add a toggle
											<span {...column.getGroupByToggleProps()}>
												{column.isGrouped ? '🛑 ' : '👊 '}
											</span>
										) : null}
										{column.render('Header')}
										<Stack sx={{ maxWidth: '300px' }}>
											{column.canFilter ? column.render('Filter') : null}
										</Stack>
									</TableCell>
								))}
							</TableRow>
						))}
					</TableHead>
					<TableBody {...getTableBodyProps()}>
						{page.map((row, i) => {
							prepareRow(row);
							return (
								<TableRow {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<TableCell {...cell.getCellProps()}>
												{cell.isGrouped ? (
													// If it's a grouped cell, add an expander and row count
													<>
														<span {...row.getToggleRowExpandedProps()}>
															{row.isExpanded ? '👇' : '👉'}
														</span>{' '}
														{cell.render('Cell')} ({row.subRows.length})
													</>
												) : cell.isAggregated ? (
													// If the cell is aggregated, use the Aggregated
													// renderer for cell
													cell.render('Aggregated')
												) : cell.isPlaceholder ? null : (
													// Otherwise, just render the regular cell
													cell.render('Cell')
												)}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<div>{pagination}</div>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(5, 1fr)',
				}}>
				<div>
					<IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle
					All
				</div>
				{allColumns.map((column) => (
					<span key={column.id}>
						<label>
							<input type='checkbox' {...column.getToggleHiddenProps()} />{' '}
							{column.id}
						</label>
					</span>
				))}
			</div>
		</>
	);
};
export default BaseTable;
