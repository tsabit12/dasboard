import React from "react";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  LinearProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'; 
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { options } from "./options";
import palette from '../../../../theme/palette';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  linear: {
  	marginTop: -18,
  	marginLeft: -16,
  	marginRight: -17
  }
}));


const BarChart = props => {
	const { className, listproduk, ...rest } = props;
	const [formState, setState] = React.useState({
		loading: true,
		data: {
			labels: ['Memuat...'],
			datasets: [
			    {
			      label: 'This year',
			      backgroundColor: palette.primary.main,
			      data: [18, 5, 19, 27, 29, 19, 20]
			    }
			]
		}
	});

	React.useEffect(() => {
		const datasets = [];
		const labels   = [];
		if (listproduk.length > 0) {
			listproduk.slice(0, 10).forEach(product => {
				datasets.push(product.bsu);
				labels.push(product.deskripsi);
			})

			setState(prevState => ({
				...prevState, 
				loading: false,
				data:{
					labels: labels,
					datasets: [{
						backgroundColor: palette.primary.main,
						data: datasets
					}]
				}
			})) 
		}
	}, [listproduk])

	const classes = useStyles();

	return(
		<Card
	      {...rest}
	      className={clsx(classes.root, className)}
	    >
	    	<CardHeader
		        action={
		          <Button
		            size="small"
		            variant="text"
		          >
		            BULAN INI <ArrowDropDownIcon />
		          </Button>
		        }
		        title="TOP PRODUK"
		    />
		    <Divider />
		    <CardContent>
		        <div className={classes.chartContainer}>
		        	{ formState.loading && <LinearProgress className={classes.linear} />}
		          	<Bar
			            data={formState.data}
			            options={options}
			        />
		        </div>
		    </CardContent>
		    <Divider/>
		    <CardActions className={classes.actions}>
		        <Button
		          color="primary"
		          size="small"
		          variant="text"
		        >
		          Overview <ArrowRightIcon />
		        </Button>
		    </CardActions>
	    </Card>
	);
}

BarChart.propTypes = {
  className: PropTypes.string,
  listproduk: PropTypes.array.isRequired
};

export default BarChart;