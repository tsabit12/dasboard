import React from "react";
import { withStyles } from '@material-ui/styles';
import { Grid, Breadcrumbs, Typography } from '@material-ui/core';
import { GrafikPendapatan, PieChart } from "./components";
import { connect } from "react-redux";
import { getToReg } from "../../../actions/grafik";
import PropTypes from "prop-types";
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

class TopReg extends React.Component{
	componentDidMount(){
		this.props.getToReg()
			.catch(err => console.log(err))
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
			          TOP REGIONAL
			        </Typography>
			    </Breadcrumbs>
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