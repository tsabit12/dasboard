import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { connect } from "react-redux";
import { getTopKrpk } from "../../../actions/grafik";
import { Grafik, TableGrafik } from "./components";

const styles = theme => ({
	root: {
	    padding: theme.spacing(4)
	  }
})


class TopKprk extends React.Component{
	componentDidMount(){
		this.props.getTopKrpk();
	}

	render(){
		const { classes } = this.props;

		return(
			<div className={classes.root}>
				<Grid container spacing={4}>
					<Grid item lg={6} md={6} xl={12} xs={12}>
						<Grafik data={this.props.grafik} />
					</Grid>
					<Grid item lg={6} md={6} xl={12} xs={12}>
						<TableGrafik data={this.props.grafik} />
					</Grid>
			    </Grid>
			</div>
		);
	}
}

TopKprk.propTypes = {
	grafik: PropTypes.array.isRequired,
	getTopKrpk: PropTypes.func.isRequired
}

function mapStateToProp(state) {
	return{
		grafik: state.grafik.topKprk 
	}
}

export default connect(mapStateToProp, { getTopKrpk })(withStyles(styles)(TopKprk));