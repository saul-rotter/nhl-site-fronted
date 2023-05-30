import React from 'react';
// A great library for fuzzy filtering/sorting items
import { matchSorter } from 'match-sorter';
import MultiRangeSlider from 'multi-range-slider-react';
import { Box } from '@mui/material';
// text search input
export function TextSearchFilter({
	column: { filterValue, preFilteredRows, setFilter },
}) {
	return (
		<input
			value={filterValue || ''}
			onChange={(e) => {
				setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
			}}
			placeholder={`Search...`}
		/>
	);
}

// a dropdown list filter
export function DropdownFilter({
	column: { filterValue, setFilter, preFilteredRows, id },
}) {
	// Calculate the options for filtering
	// using the preFilteredRows
	const options = React.useMemo(() => {
		const options = new Set();
		preFilteredRows.forEach((row) => {
			options.add(row.values[id]);
		});
		return [...options.values()];
	}, [id, preFilteredRows]);

	// Render a multi-select box
	return (
		<select
			value={filterValue}
			onChange={(e) => {
				setFilter(e.target.value || undefined);
			}}>
			<option value=''>All</option>
			{options.map((option, i) => (
				<option key={i} value={option}>
					{option}
				</option>
			))}
		</select>
	);
}

// a dropdown list filter
export function TeamDropdownFilter({
	column: { filterValue, setFilter, preFilteredRows, id },
}) {
	// Calculate the options for filtering
	// using the preFilteredRows
	const options = React.useMemo(() => {
		const options = new Set();
		preFilteredRows.forEach((row) => {
			return options.add(row.values[id]['name']);
		});
		return [...options.values()];
	}, [id, preFilteredRows]);

	// Render a multi-select box
	return (
		<select
			value={filterValue}
			onChange={(e) => {
				setFilter(e.target.value || undefined);
			}}>
			<option value=''>All</option>
			{options.map((option, i) => (
				<option key={i} value={option}>
					{option}
				</option>
			))}
		</select>
	);
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
	return rows.filter((row) => {
		const rowValue = row.values[id];
		return rowValue >= filterValue;
	});
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== 'number';

// Define a default UI for filtering
// function GlobalFilter({
// 	preGlobalFilteredRows,
// 	globalFilter,
// 	setGlobalFilter,
// }) {
// 	const count = preGlobalFilteredRows.length;
// 	const [value, setValue] = React.useState(globalFilter);
// 	const onChange = useAsyncDebounce((value) => {
// 		setGlobalFilter(value || undefined);
// 	}, 200);

// 	return (
// 		<span>
// 			Search:{' '}
// 			<input
// 				value={value || ''}
// 				onChange={(e) => {
// 					setValue(e.target.value);
// 					onChange(e.target.value);
// 				}}
// 				placeholder={`${count} records...`}
// 				style={{
// 					fontSize: '1.1rem',
// 					border: '0',
// 				}}
// 			/>
// 		</span>
// 	);
// }

// Define a default UI for filtering
export function DefaultColumnFilter({
	column: { filterValue, preFilteredRows, setFilter },
}) {
	const count = preFilteredRows.length;

	return (
		<input
			value={filterValue || ''}
			onChange={(e) => {
				setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
			}}
			placeholder={`Search ${count} records...`}
		/>
	);
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
	column: { filterValue, setFilter, preFilteredRows, id },
}) {
	// Calculate the options for filtering
	// using the preFilteredRows
	const options = React.useMemo(() => {
		const options = new Set();
		preFilteredRows.forEach((row) => {
			options.add(row.values[id]);
		});
		return [...options.values()];
	}, [id, preFilteredRows]);

	// Render a multi-select box
	return (
		<select
			value={filterValue}
			onChange={(e) => {
				setFilter(e.target.value || undefined);
			}}>
			<option value=''>All</option>
			{options.map((option, i) => (
				<option key={i} value={option}>
					{option}
				</option>
			))}
		</select>
	);
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
export function SliderColumnFilter({
	column: { filterValue = [], setFilter, preFilteredRows, id },
}) {
	// Calculate the min and max
	// using the preFilteredRows

	const [min, max] = React.useMemo(() => {
		let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
		let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
		preFilteredRows.forEach((row) => {
			min = Math.min(row.values[id], min);
			max = Math.max(row.values[id], max);
		});
		return [min, max];
	}, [id, preFilteredRows]);

	return (
		<Box
			sx={{
				width: 'auto',
			}}>
			<MultiRangeSlider
				min={min}
				max={max}
				minValue={filterValue[0] || min}
				maxValue={filterValue[1] || max}
				onChange={(e) => {
					setFilter(() => [e.minValue, e.maxValue]);
				}}
			/>
		</Box>
	);
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
export function NumberRangeColumnFilter({
	column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
	const [min, max] = React.useMemo(() => {
		let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
		let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
		preFilteredRows.forEach((row) => {
			min = Math.min(row.values[id], min);
			max = Math.max(row.values[id], max);
		});
		return [min, max];
	}, [id, preFilteredRows]);

	return (
		<div
			style={{
				display: 'flex',
			}}>
			<input
				value={filterValue[0] || ''}
				type='number'
				onChange={(e) => {
					const val = e.target.value;
					setFilter((old = []) => [
						val ? parseInt(val, 10) : undefined,
						old[1],
					]);
				}}
				placeholder={`Min (${min})`}
				style={{
					width: '70px',
					marginRight: '0.5rem',
				}}
			/>
			to
			<input
				value={filterValue[1] || ''}
				type='number'
				onChange={(e) => {
					const val = e.target.value;
					setFilter((old = []) => [
						old[0],
						val ? parseInt(val, 10) : undefined,
					]);
				}}
				placeholder={`Max (${max})`}
				style={{
					width: '70px',
					marginLeft: '0.5rem',
				}}
			/>
		</div>
	);
}

export function fuzzyTextFilterFn(rows, id, filterValue) {
	return matchSorter(rows, filterValue, {
		keys: [
			(row) => {
				return row.values[id] ? row.values[id]['name'] : '';
			},
		],
	});
}
// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

export function fuzzyListFilterFn(rows, id, filterValue) {
	return matchSorter(rows, filterValue, {
		keys: [
			(row) => {
				return row.values[id].map(({ name }) => name);
			},
		],
	});
}

// Let the table remove the filter if the string is empty
fuzzyListFilterFn.autoRemove = (val) => !val;
