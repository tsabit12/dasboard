import React from "react";
import PropTypes from "prop-types";
import { Bar } from 'react-chartjs-2';
import {
  Card,
  CardHeader,
  CardContent,
  // CardActions,
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'; 
import clsx from "clsx";
import palette from '../../../../theme/palette';
import { options } from "../../Dashboard/components/options";
import Loader from 'react-loader-spinner';

const useStyles = makeStyles(() => ({
  root: {
  	height:'100%'
  },
  chartContainer: {
    position: 'relative',
    height: '450px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  linear: {
  	marginTop: -18,
  	marginLeft: -16,
  	marginRight: -17
  }
}));


const GrafikPendapatan = props => {
	const [formState, setState] = React.useState({
		data: {
			labels: ['Memuat'],
			datasets: [	
				{
					label: 'Reg 1',
					backgroundColor: palette.primary.main,
					data: [0]
				}
			]
		}
	})

	const { className, data, param, ...rest } = props;
	
	React.useEffect(() => {
		if (data.length > 0) {
			const filtered 		= data.filter(list => list.wilayah !== 'KANTOR PUSAT');
			const labels 		= [];
			const totRealisasi 	= [];
			const totTarget 	= [];

			filtered.forEach(x => {
				totTarget.push(x.t_jumlah_bsu);
				totRealisasi.push(x.r_jumlah_bsu);
				labels.push(x.wilayah);
			});

			setState(prevState => ({
				...prevState,
				data: {
					labels,
					datasets: [{
						label: 'Target',
						backgroundColor: palette.warning.main,
						data: totTarget
					},{
						label: 'Realisasi',
						backgroundColor: palette.secondary.light,
						data: totRealisasi
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
			<CardHeader title={`TOP REGIONAL PERIODE ${param}`}/>
		    <Divider />
		    <CardContent>
		    	<div className={classes.chartContainer}>
		    		{ data.length === 0 ? 
			    		<Loader
			                type="TailSpin"
			                color="#00BFFF"
			                height={200}
			                width={200}
			            /> : <Bar
					            data={formState.data}
					            options={options}
					/>}
		    		
		    	</div>
		    </CardContent>
		</Card>
	);
}

GrafikPendapatan.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  param: PropTypes.string.isRequired
}

export default GrafikPendapatan;