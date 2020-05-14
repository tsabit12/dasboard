import React from "react";
import { makeStyles } from '@material-ui/styles'; 
import clsx from "clsx";
import { Bar } from 'react-chartjs-2';
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardContent,
  // CardActions,
  Divider
} from '@material-ui/core';
import palette from '../../../../theme/palette';
import { options } from "../../Dashboard/components/options";

const useStyles = makeStyles(() => ({
  root: {
  	height: '100%',
  	marginTop: '10px'
  },
  chartContainer: {
    position: 'relative',
    height: '500px'
  },
  linear: {
  	marginTop: -18,
  	marginLeft: -16,
  	marginRight: -17
  }
}));

const Grafik = props => {
	const [formState, setState] = React.useState({
		data: {
			labels: ['Memuat..'],
			datasets: [	
				{
					label: 'Loading...',
					backgroundColor: palette.primary.main,
					data: [0]
				}
			]
		}
	})

	const { className, data, ...rest } = props;

	React.useEffect(() => {
		if (data.length > 0) {
			const labels 	= [];
			const total 	= [];

			data.forEach(x => {
				// const kantor = `${x.NamaKtr}-${x.nopendsr}`;
				total.push(Number(x.total));
				labels.push(x.nopendsr);
			});

			setState(prevState => ({
				...prevState,
				data: {
					labels,
					datasets: [{
						label: 'Total',
						backgroundColor: palette.warning.main,
						data: total
					}] 
				}
			}))

		}
	}, [data])

	const classes = useStyles();

	return(
		<Card
		  {...rest}
		  className={clsx(classes.root, className)}
		>
			<CardHeader title="TOP KANTOR POS BULAN INI"/>
		    <Divider />
		    <CardContent>
		    	<div className={classes.chartContainer}>
		    		<Bar
			            data={formState.data}
			            options={options}
			        />
		    	</div>
		    </CardContent>
		</Card>
	);
}

Grafik.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired
}

export default Grafik;