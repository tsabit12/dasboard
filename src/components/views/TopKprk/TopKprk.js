import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/styles';
import { Grid, Breadcrumbs, Typography } from '@material-ui/core';
import { connect } from "react-redux";
import { getTopKrpk } from "../../../actions/grafik";
import { Grafik, TableGrafik } from "./components";
import AssessmentIcon from '@material-ui/icons/Assessment';
import WhatshotIcon from '@material-ui/icons/Whatshot';

const styles = theme => ({
	root: {
	    padding: theme.spacing(4)
	},
	link: {
	    display: 'flex',
	},
	icon: {
	    marginRight: theme.spacing(0.5),
	    width: 20,
	    height: 20,
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
				<Breadcrumbs aria-label="Breadcrumb">
			        <div className={classes.link}>
				        <AssessmentIcon className={classes.icon} />
				        TOP BISNIS KORPORAT
			        </div>
			        <Typography color="textPrimary" className={classes.link}>
			          <WhatshotIcon className={classes.icon} />
			          TOP 10 KANTOR POS
			        </Typography>
			    </Breadcrumbs>
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