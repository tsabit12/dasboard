import React from "react";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'; 
import { options } from "./options";
import palette from '../../../../theme/palette';

const useStyles = makeStyles(() => ({
  root: {
  	height: '100%'
  },
  chartContainer: {
    height: '500px',
    position: 'relative'
  },
  empty: {
  	height: '450px',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
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
	const { className, listproduk, search, ...rest } = props;
	const [formState, setState] = React.useState({
		data: {
			labels: ['Memuat...'],
			datasets: [
			    {
			      label: 'Example',
			      backgroundColor: palette.primary.main,
			      data: [0]
			    }
			]
		}
	});

	React.useEffect(() => {
		const datasets = [];
		const labels   = [];
		if (listproduk.length > 0) {
			listproduk.slice(0, 10).forEach(product => {
				datasets.push(Number(product.produksi));
				labels.push(product.deskripsi);
			})

			setState(prevState => ({
				...prevState, 
				data:{
					labels: labels,
					datasets: [{
						label: 'Produksi',
						backgroundColor: palette.primary.main,
						data: datasets
					}]
				}
			})) 
		}
	}, [listproduk])

	const classes = useStyles();

	return(
		<React.Fragment>
			<Card
		      {...rest}
		      className={clsx(classes.root, className)}
		    >
		    	{ search.start ? <CardHeader 
		    		title={`TOP PRODUK (${search.start} sampai ${search.end})`}
		    	/> : <CardHeader title='TOP PRODUK'/>}
			    <Divider />
			    <CardContent>
		        	{ listproduk.length > 0 ? <div className={classes.chartContainer}>
		        		<Bar
			            	data={formState.data}
			            	options={options}
			            />
					</div> : <div className={classes.empty}>
						<p>klik icon search untuk menampilkan data</p>
					</div> }
			    </CardContent>
		    </Card>
	    </React.Fragment>
	);
}

BarChart.propTypes = {
  className: PropTypes.string,
  listproduk: PropTypes.array.isRequired,
  search: PropTypes.object.isRequired
};

export default BarChart;