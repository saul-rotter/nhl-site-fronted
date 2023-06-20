import React, { useState } from 'react';
import {
	Card,
	CardContent,
	CardMedia,
	Collapse,
	Typography,
	CardActionArea,
	Stack,
	Divider,
} from '@mui/material';
import { teamColors } from '../../utilities/teamColors';

const GPTTeamCard = ({ teamData }) => {
	const [expanded, setExpanded] = useState(false);
	const handleCardClick = () => {
		setExpanded(!expanded);
	};

	const { id, name, score, coach } = teamData;
	const logoPath = process.env.PUBLIC_URL + '/images/team-logos/' + id + '.jpg';
	return (
		<Card
			style={{
				backgroundColor: teamColors[id],
				borderRadius: '8px', // Adjust the border radius as desired
				overflow: 'hidden', // Hide any overflow of the image
			}}>
			<CardActionArea onClick={handleCardClick}>
				<CardContent
					style={{
						padding: '8px',
						background: '#fff',
					}}>
					<Stack
						direction='row'
						alignItems='center'
						spacing={2}
						divider={<Divider orientation='vertical' flexItem />}>
						<CardMedia
							component='img'
							alt={name}
							height='50'
							image={logoPath}
							style={{
								objectFit: 'contain',
								borderRadius: '50%',
								width: '33%',
							}}
						/>
						<Typography variant='h6' align='center'>
							{name}
						</Typography>
					</Stack>
				</CardContent>
			</CardActionArea>
			<Collapse in={expanded} timeout='auto' unmountOnExit>
				<CardContent>
					<Typography variant='body1'>Final Score: {score}</Typography>
					<Typography variant='body2'>Coach: {coach}</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
};
export default GPTTeamCard;
