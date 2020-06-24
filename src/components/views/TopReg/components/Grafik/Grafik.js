import React from "react";
import {
	Card,
	CardHeader,
	CardContent,
	Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Bar } from 'react-chartjs-2';
import PropTypes from "prop-types";
import { options } from "../../../Dashboard/components/options";

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	chartContainer: {
		position: 'relative',
		height: '460px'
	},
	empty: {
		position: 'relative',
		height: '460px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
}))

const Grafik = props => {
	const classes 	= useStyles();
	const { data } 	= props;

	return(
		<Card className={classes.root}>
			<CardHeader 
				title="GRAFIK TOP REGIONAL"
			/>
			<Divider />
			<CardContent>
				{ Object.keys(data).length > 0 ? <div className={classes.chartContainer}>
					<Bar
			            data={data}
			            options={options}
			        />
				</div> : <div className={classes.empty}>
					<p>Klik tombol tampilkan untuk menampilkan data top regional</p>
				</div> }
			</CardContent>
		</Card>
	);
}

Grafik.propTypes = {
	data: PropTypes.object.isRequired
}

export default Grafik;