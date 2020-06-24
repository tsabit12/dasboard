import React from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import { 
	Card,
	CardHeader,
	Divider,
	Typography
}  from "@material-ui/core";
import PropTypes from "prop-types";
import { Doughnut } from 'react-chartjs-2';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	pieContainer: {
		position: 'relative',
		height: '428px'
	},
	label: {
		overflowY: 'auto',
	    display: 'flex',
	    justifyContent: 'space-between',
	    marginLeft: 5,
	    marginRight: 5
	},
	device: {
	    textAlign: 'center',
	    padding: theme.spacing(1),
	    // borderStyle: 'solid',
	    // borderWidth: 1,
	    margin: 2,
	    borderRadius: 4
	}
}))

const Pie = props => {
	const theme = useTheme();
	const classes = useStyles();
	
	const options = {
		legend: {
			display: false
		},
		responsive: true,
		maintainAspectRatio: false,
		animation: false,
		cutoutPercentage: 80,
		layout: { padding: 0 },
		tooltips: {
			enabled: true,
			mode: 'index',
			intersect: false,
			borderWidth: 1,
			borderColor: theme.palette.divider,
			backgroundColor: theme.palette.white,
			titleFontColor: theme.palette.text.primary,
			bodyFontColor: theme.palette.text.secondary,
			footerFontColor: theme.palette.text.secondary
		}
	}

	const { data } = props;

	return(
		<Card className={classes.root}>
			<CardHeader 
				title='PERSENTASE'
			/>
			<Divider />
			{ Object.keys(data).length > 0 && <React.Fragment>
					<div className={classes.pieContainer}>
						<Doughnut
							data={data}
							options={options}
						/>
					</div>
					<div className={classes.label}>
						{data.dataPie.map((row, i) => (
				            <div
				              className={classes.device}
				              style={{backgroundColor: row.color}}
				              key={i}
				            >
				              <Typography variant="body1" style={{whiteSpace: 'nowrap', color: '#FFFF'}}>{row.name}</Typography>
				              <Typography
				                style={{ color: '#FFFF' }}
				                variant="h5"
				              >
				                {row.jumlah}
				              </Typography>
				            </div>
				        ))}
				    </div>
			</React.Fragment> }
		</Card>
	);
}

Pie.propTypes = {
	data: PropTypes.object.isRequired
}

export default Pie;