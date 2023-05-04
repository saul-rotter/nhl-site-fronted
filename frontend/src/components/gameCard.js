import React from 'react';
import {
	Box,
	Card,
	CardContent,
	CardActions,
	Typography,
	Button,
	CardMedia,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
	ListItemIcon,
	Divider,
	ListItemAvatar,
	Avatar,
} from '@mui/material';

const GameDataList = () => {
	return (
		<Box sx={{ width: '400px', bgcolor: '#efefef' }}>
			<List>
				<ListItem disablePadding>
					<ListItemText primary='List item 1' />
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText primary='List item 1' />
				</ListItem>
				<ListItem>
					<ListItemText primary='List item 3' />
				</ListItem>
			</List>
		</Box>
	);
};

export const GameCard = () => {
	return (
		<Box width='300px'>
			<Card>
				<CardContent>
					<GameDataList />
				</CardContent>
				<CardActions>
					<Button size='small'>Share</Button>
					<Button size='small'>Learn More</Button>
				</CardActions>
			</Card>
		</Box>
	);
};
