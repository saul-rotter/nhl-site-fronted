import React, { useState } from 'react';
import { Container, Paper, Card, Grid, Tooltip, Avatar, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Collapse, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { useTable } from 'react-table';
import { useQuery } from 'react-query';

const getUsers = async () => {
  const response = await fetch('https://example.com/api/users');
  const data = await response.json();
  return data;
};

const MyTable = () => {
  const { data, isLoading } = useQuery('users', getUsers);

  const [expandedRow, setExpandedRow] = useState(null);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ row }) => (
          <Tooltip title={row.original.name} placement="top">
            <Avatar alt={row.original.name} src={row.original.avatarUrl} />
          </Tooltip>
        ),
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Friends',
        accessor: 'friends',
        Cell: ({ row }) => (
          <>
            <Tooltip title="Expand" placement="top">
              <span
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => setExpandedRow(row.id === expandedRow ? null : row.id)}
              >
                {row.original.friends.length} friend(s)
              </span>
            </Tooltip>
            <Collapse in={row.id === expandedRow} timeout="auto" unmountOnExit>
              <List>
                {row.original.friends.map((friend) => (
                  <ListItem key={friend.id}>
                    <ListItemAvatar>
                      <Avatar alt={friend.name} src={friend.avatarUrl} />
                    </ListItemAvatar>
                    <ListItemText primary={friend.name} secondary={friend.email} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </>
        ),
      },
    ],
    [expandedRow]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <Container style={{ backgroundColor: '#002D72', minHeight: '100vh', padding: '16px' }}>
      <Paper elevation={0} square style={{ backgroundColor: '#ffffff', padding: '16px' }}>
        {/* Header content */}
      </Paper>
      <Card variant="outlined" style={{ backgroundColor: '#ffffff', margin: '16px 0' }}>
        {/* Content above the table */}
      </Card>
      <Grid container component={Paper} elevation={0} square style={{ flex: 1, overflow: 'auto', backgroundColor: '#ffffff' }}>
        <TableContainer>
          <Table {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell {...column.getHeaderProps()} style={{ color: '#002D72', fontWeight: 'bold' }}>
                      {column.render('Header')}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length}>Loading...</TableCell>
                </TableRow>
              ) : (
                rows.map((row) => {
                  prepareRow(row);
                  return (
                    <React.Fragment key={row.getRowProps().key}>
                      <TableRow {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={columns.length}>
                          <Collapse in={row.id === expandedRow} timeout="auto" unmountOnExit>
                            <Card variant="outlined" style={{ padding: '16px' }}>
                              {/* Additional information card */}
                            </Card>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Paper elevation={0} square style={{ backgroundColor: '#ffffff', padding: '16px', color: '#002D72' }}>
        {/* Footer content */}
      </Paper>
    </Container>
  );
};

export default MyTable;



import * as React from 'react';
import PropTypes from 'prop-types';
import useAutocomplete from '@mui/base/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';

const Root = styled('div')(
  ({ theme }) => `
  color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
  };
  font-size: 14px;
`,
);

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled('div')(
  ({ theme }) => `
  width: 300px;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'
  };
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`,
);

const Listbox = styled('ul')(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`,
);

export default function CustomizedHook() {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    defaultValue: [top100Films[1]],
    multiple: true,
    options: top100Films,
    getOptionLabel: (option) => option.title,
  });

  return (
    <Root>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>Customized hook</Label>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option, index) => (
            <StyledTag label={option.title} {...getTagProps({ index })} />
          ))}

          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option.title}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
}
