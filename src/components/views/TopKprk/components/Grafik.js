import React from "react";
import { makeStyles } from '@material-ui/styles'; 
import clsx from "clsx";
import { Bar } from 'react-chartjs-2';
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Fab,
  Grid,
  Divider
} from '@material-ui/core';
import palette from '../../../../theme/palette';
import { options } from "../../Dashboard/components/options";
import { DatePicker } from "@material-ui/pickers";
import SearchIcon from '@material-ui/icons/Search';
import TableGrafik from "./TableGrafik";
import PieChart from "./PieChart";

const getColor = (index) => {
	switch(index){
		case 0:
			return '#FF5E14';
		case 1:
			return '#2F4F4F';
		case 2:
			return '#FF8C00';
		case 3:
			return '#612B04';
		case 4:
			return '#3F6104';
		case 5:
			return '#14D0FF';
		case 6:
			return '#1481FF';
		case 7:
			return '#1418FF';
		case 8:
			return '#9D14FF';
		case 9:
			return '#FF1414';
		default: return '#FFFFFF';
	}
}

const useStyles = makeStyles(() => ({
  root: {
  	height: '100%'
  },
  chartContainer: {
  	position: 'relative',
  	height: '400px',
  	margin: 10
  },
  cardContent: {},
  linear: {
  	marginTop: -18,
  	marginLeft: -16,
  	marginRight: -17
  },
  row: {
  	display: 'flex',
  	margin: 2,
  	alignItems: 'center',
  	//justifyContent: 'flex-end'
  },
  field: {
  	paddingRight: 15
  },
  fab: {
  	marginTop: 13,
  	marginRight: 15
  },
  empty: {
  	position: 'relative',
    height: '400px',
  	display: 'flex',
  	alignItems: 'center',
  	justifyContent: 'center'
  }
}));

const RenderActionCard = props => {
	const classes = useStyles();
	return(
		<div className={classes.row}>
			<div className={classes.field}>
	    		<DatePicker
			        format="DD/MM/YYYY"
			        views={["year", "month", "date"]}
			        label="Mulai"
			        value={props.value.start}
			        onChange={(e) => props.onChange(e._d, 'start')}
			    />
		    </div>
		    <div className={classes.field}>
			    <DatePicker
			        format="DD/MM/YYYY"
			        views={["year", "month", "date"]}
			        label="Sampai"
			        value={props.value.end}
			        onChange={(e) => props.onChange(e._d, 'end')}
			    />
		    </div>
		</div>
	);
} 

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
		},
		pie: {
			datasets: [{
				data: [100],
				borderWidth: 8,
	        	borderColor: 'white',
	        	hoverBorderColor: 'red'
			}],
			labels: ['Loading..'],
			dataPie: []
		}
	})

	const { className, data, param, ...rest } = props;

	React.useEffect(() => {
		if (data.length > 0) {
			const labels 	= [];
			const total 	= [];
			const totalB 	= [];
			const totalInPie = [];
			const backgroundColor = [];
			const dataPie 	= [];

			data.forEach((x, i) => {
				total.push(Number(x.total));
				totalB.push(Number(x.total2));
				labels.push(x.nopendsr);
				totalInPie.push(Number(x.total_persen));
				backgroundColor.push(getColor(i));
				dataPie.push({
					name: x.nopendsr,
					color: getColor(i),
					jumlah: Number(x.total_persen)
				})
			});

			setState(prevState => ({
				...prevState,
				data: {
					labels,
					datasets: [{
						label: 'Jumlah Realisasi',
						backgroundColor: palette.warning.main,
						data: total
					},{
						label: 'Jumlah Target',
						backgroundColor: palette.primary.main,
						data: totalB
					}] 
				},
				pie: {
					datasets: [{
						data: totalInPie,
						borderWidth: 8,
				        borderColor: '#FFFFFF',
				        hoverBorderColor: '#FFFFFF',
				        backgroundColor
					}],
					labels,
					dataPie
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
			<CardHeader 
				title={
					<RenderActionCard 
						value={props.value} 
						onChange={props.handleChange}
					/>
				}
				action={
					<div className={classes.fab}>
						<Fab color="primary" aria-label="Add" size="small" onClick={props.onSubmit}>
					        <SearchIcon />
					    </Fab>
				    </div>
				}
			/>
		    <Divider />
	    	{ data.length > 0 ?
		    		<Grid container spacing={2}>
		    			<Grid item lg={6} md={6} xl={12} xs={12}>
		    				<div className={classes.chartContainer}>
					    		<Bar
						            data={formState.data}
						            options={options}
						        />
					        </div>
				        </Grid>
				        <Grid item lg={6} md={6} xl={12} xs={12}>
				    		<PieChart 
				    			data={formState.pie}
				    		/>
				        </Grid>
				        <Grid item lg={12} md={12} xl={12} xs={12}>
							<TableGrafik data={data} />
						</Grid>
				    </Grid> : <div className={classes.empty}>
	    		<p>Klik icon search untuk menampilkan data</p>
	    	</div> }
		</Card>
	);
}

Grafik.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  value: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default Grafik;