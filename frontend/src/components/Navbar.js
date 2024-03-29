import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
	Stack,
} from '@mui/material';
import React from 'react';
import SportsHockeyIcon from '@mui/icons-material/SportsHockey';

export const Navbar = () => {
	return (
		<AppBar position='static' color='transparent'>
			<Toolbar>
				<IconButton size='large' edge='start' color='inherit' aria-label='logo'>
					<SportsHockeyIcon />
				</IconButton>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					NHL PLAY TOOL
				</Typography>
				<Stack direction='row' spacing={2}>
					<Button color='inherit'>Features</Button>
					<Button color='inherit'>About</Button>
				</Stack>
			</Toolbar>
		</AppBar>
	);
};
