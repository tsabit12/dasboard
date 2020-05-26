import React from "react";
import { makeStyles, useTheme } from '@material-ui/styles';
import { Doughnut } from 'react-chartjs-2';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from '@material-ui/core';
import clsx from "clsx";
import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '370px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));


const ProdukReport = props => {
	const classes = useStyles();
  	const theme = useTheme();
  	const { list } = props;

  	const [fromState, setState] = React.useState({
  		datasets: [
	      {
	        data: [100],
	        // backgroundColor: [theme.palette.primary.main],
	        borderWidth: 8,
	        borderColor: theme.palette.white,
	        hoverBorderColor: theme.palette.white
	      }
	    ],
	    labels: ['Desktop']
  	})

  	React.useEffect(() => {
  		if (list.length > 0) {
  			const data 				= [];
  			const labels	 		= [];
  			const backgroundColor 	= [];

  			list.forEach(row => {
  				data.push(Number(row.jumlah));
  				labels.push(row.layanan);
  				backgroundColor.push(row.color);
  			});

  			setState(prevState => ({
  				...prevState,
  				datasets: [{
  					data,
			        backgroundColor,
			        borderWidth: 8,
			        borderColor: theme.palette.white,
			        hoverBorderColor: theme.palette.white
  				}],
  				labels
  			}))
  		}
  	}, [list]);

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

	return(
		<Card className={clsx(classes.root)}
	    >
	      <CardHeader
	        action={
	          <IconButton size="small">
	            <RefreshIcon />
	          </IconButton>
	        }
	        title="REPORT BY PRODUK"
	      />
	      <Divider />
	      <CardContent>
	        <div className={classes.chartContainer}>
	          <Doughnut
	            data={fromState}
	            options={options}
	          />
	        </div>
	      </CardContent>
	      <div className={classes.stats} style={{overflowY: 'auto'}}>
	           {list.map(row => (
		            <div
		              className={classes.device}
		              key={row.layanan}
		            >
		              <Typography variant="body2" style={{whiteSpace: 'nowrap'}}>{row.layanan}</Typography>
		              <Typography
		                style={{ color: row.color }}
		                variant="h5"
		              >
		                {row.jumlah}
		              </Typography>
		            </div>
		        ))}
	        </div>
	    </Card>
	);
}

export default ProdukReport;