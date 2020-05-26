import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/styles'; 
import {
  Card,
  CardHeader,
  CardContent,
  // CardActions,
  Divider,
  Button
} from '@material-ui/core';
import clsx from "clsx";
import { Bar } from 'react-chartjs-2';
import palette from '../../../../theme/palette';
import { options } from "../../options";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles(() => ({
  root: {
  	height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '400px'
  }
}));

const Grafik = props => {
	const { list } = props;

	const [formState, setState] = React.useState({
		data: {
			labels: ['Loading..'],
			datasets: [	
				{
					label: 'data1',
					backgroundColor: palette.primary.main,
					data: [0]
				}
			]
		}
	})

	React.useEffect(() => {
		if (list.length > 0) {
			const labels 	= [];
			const totalPickup 	= [];
			const totalOrder 	= [];
			const totalTrans 	= [];
			list.forEach(row => {
				labels.push(row.hari);
				totalPickup.push(Number(row.totpickup));
				totalOrder.push(Number(row.totorder));
				totalTrans.push(Number(row.tottrans));
			});

			setState(prevState => ({
				...prevState,
				data: {
					labels,
					datasets: [{
							label: 'Order',
							backgroundColor: palette.primary.main,
							data: totalOrder
						},{
							label: 'Pickup',
							backgroundColor: palette.success.main,
							data: totalPickup
						},{
							label: 'Transaksi',
							backgroundColor: palette.error.main,
							data: totalTrans
					}]
				}
			}))
		}
	}, [list])

	const classes = useStyles();
	
	return(
		<Card
		  className={clsx(classes.root)}
		>
			<CardHeader
		        action={
		          <Button
		            size="small"
		            variant="text"
		          >
		            7 Hari Terakhir <ArrowDropDownIcon />
		          </Button>
		        }
		        title="REPORT ORDER"
		    />
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
	list: PropTypes.array.isRequired
}

export default Grafik;