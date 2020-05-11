import React from "react";
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { GrafikPendapatan, PieChart } from "./components";
import { connect } from "react-redux";
import { getToReg } from "../../../actions/grafik";
import PropTypes from "prop-types";

const styles = theme => ({
	root: {
	    padding: theme.spacing(4)
	  }
})

class TopReg extends React.Component{
	componentDidMount(){
		this.props.getToReg()
			.catch(err => console.log(err))
	}

	render(){
		const { classes } = this.props;
		return(
			<div className={classes.root}>
				<Grid container spacing={4}>
					<Grid item lg={7} md={7} xl={12} xs={12}>
						<GrafikPendapatan 
							data={this.props.grafik}
						/>
					</Grid>
					<Grid item lg={5} md={5} xl={12} xs={12}>
						<PieChart 
							data={this.props.grafik}
						/>
					</Grid>
			    </Grid>
			</div>
		);
	}
}

TopReg.propTypes = {
	getToReg: PropTypes.func.isRequired,
	grafik: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return{
		grafik: state.grafik.topReg
	}
}

export default connect(mapStateToProps, { getToReg })(withStyles(styles)(TopReg));