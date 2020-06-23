import React from "react";
import { Doughnut } from 'react-chartjs-2';
import { useTheme, makeStyles } from "@material-ui/styles";
import {
	Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
	  	height: '370px',
	  	margin: 15
	},
  	label: {
		overflowY: 'auto',
	    display: 'flex',
	    justifyContent: 'space-between'
	},
	device: {
	    textAlign: 'center',
	    padding: theme.spacing(1)
	},
}));

const PieChart = props => {
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

	const { dataPie } = props.data;

	return(
		<div className={classes.root}>
			<Doughnut
				data={props.data}
				options={options}
			/>
			<div className={classes.label}>
				{ dataPie.length > 0 && <React.Fragment>
					{dataPie.map((row, i) => (
			            <div
			              className={classes.device}
			              key={i}
			            >
			              <Typography variant="body1" style={{whiteSpace: 'nowrap', color: row.color}}>{row.name}</Typography>
			              <Typography
			                style={{ color: row.color }}
			                variant="h5"
			              >
			                {row.jumlah}
			              </Typography>
			            </div>
			        ))}
				</React.Fragment> }
			</div>
		</div>
	);
}

export default PieChart;