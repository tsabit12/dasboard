import React from "react";
import {
	Card,
	CardHeader,
	CardContent,
	Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { options } from "../../../Dashboard/components/options";
import { Bar } from 'react-chartjs-2';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	chartContainer: {
		position: 'relative',
		height: '439px'
	},
	empty: {
		position: 'relative',
		height: '460px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
}))

const Chart = props => {
	const classes = useStyles();
	return(
		<Card className={classes.root}>
			<CardHeader 
				title="GRAFIK TOP KPRK"
			/>
			<Divider />
			<CardContent>
				{ Object.keys(props.data).length > 0 ? <div className={classes.chartContainer}>
					<Bar
			            data={props.data}
			            options={options}
			        />
				</div> : <div className={classes.empty}>
					<p>Klik tombol tampilkan untuk menampilkan data top kprk</p>
				</div>}
			</CardContent>
		</Card>
	);	
}

Chart.propTypes = {
	data: PropTypes.object.isRequired
}

export default Chart;