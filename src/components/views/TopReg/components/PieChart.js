import React from "react";
import PropTypes from "prop-types";
import { Doughnut } from 'react-chartjs-2';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles'; 
import clsx from "clsx";
import palette from '../../../../theme/palette';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '400px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    //justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));


const PieChart = props => {
	const theme = useTheme();

	const [formState, setState] = React.useState({
		pie: {
			datasets: [{
				data: [12],
				borderWidth: 8,
				backgroundColor: [
			      theme.palette.primary.main
			    ],
				borderColor: theme.palette.white,
				hoverBorderColor: theme.palette.white
			}],
			labels: ['Loading...']
		},
		office: []
	})

	const { className, data, ...rest } = props;
	const classes = useStyles();
	
	React.useEffect(() => {
		if (data.length > 0) {
			const filtered 		= data.filter(list => list.wilayah !== 'KANTOR PUSAT');
			const mydata 		= [];
			const labels 		= [];
			const office 		= [];
			filtered.forEach(x => {
				var exp 	= x.wilayah.split(' ');
				var id 		= `${exp[0]} ${exp[1]}`;
				mydata.push(x.p_jumlah);
				labels.push(id);
				office.push({title: id, value: x.p_jumlah, icon: <LaptopMacIcon />, color: palette.error.main })
			});

			setState(prev => ({
				...prev,
				pie: {
					datasets: [{
						data: mydata,
						backgroundColor: [
					      palette.primary.main,
					      palette.error.main,
					      palette.warning.main,
					      palette.secondary.main,
					      palette.primary.light,
					      palette.error.light,
					      palette.warning.light,
					      palette.secondary.light,
					      palette.primary.dark,
					      palette.error.dark,
					      palette.success.dark
					    ],
						borderWidth: 8,
						borderColor: palette.white,
						hoverBorderColor: palette.white
					}],
					labels: labels
				},
				office
			}))
		}
	}, [data]);

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
	      borderColor: palette.divider,
	      backgroundColor: palette.white,
	      titleFontColor: palette.text.primary,
	      bodyFontColor: palette.text.secondary,
	      footerFontColor: palette.text.secondary
	 	}
	};


	return(
		<Card
		  {...rest}
		  className={clsx(classes.root, className)}
		>
			<CardHeader title="PERSENATSE"/>
		    <Divider />
		    <CardContent>
		    	<div className={classes.chartContainer}>
		    		 <Doughnut
			            data={formState.pie}
			            options={options}
			          />
		    	</div>
		    </CardContent>
	    	<div className={classes.stats} style={{overflowY: 'auto'}}>
	    		{ formState.office.length > 0 && <React.Fragment>
	    			{formState.office.map(device => (
			            <div
			              className={classes.device}
			              key={device.title}
			            >
			              <span className={classes.deviceIcon}>{device.icon}</span>
			              <Typography variant="body2">{device.title}</Typography>
			              <Typography
			                style={{ color: device.color }}
			                variant="h4"
			              >
			                {device.value}%
			              </Typography>
			            </div>
			          ))}
	    		</React.Fragment> }
	        </div>
		</Card>
	);
}

PieChart.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired
}

export default PieChart;