import React from "react";
import { 
	Grid,
	Breadcrumbs,
	Typography
} from '@material-ui/core';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/styles';
import { TableAe, GrafikAe } from "./components";
import AssessmentIcon from '@material-ui/icons/Assessment';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { connect } from "react-redux";
import { getTopAe } from "../../../actions/ae";

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

class TopAe extends React.Component{
	componentDidMount(){
		this.props.getTopAe();
	}

	render(){
		const { classes } = this.props;

		return(
			<div elevation={0} className={classes.root}>
				<Breadcrumbs aria-label="Breadcrumb">
			        <div className={classes.link}>
				        <AssessmentIcon className={classes.icon} />
				        TOP BISNIS KORPORAT
			        </div>
			        <Typography color="textPrimary" className={classes.link}>
			          <WhatshotIcon className={classes.icon} />
			          TOP 100 AE (BULAN INI)
			        </Typography>
			    </Breadcrumbs>
				<Grid container spacing={2}>
					<Grid item lg={12} md={12} xl={12} xs={12}>
						<GrafikAe data={this.props.grafik} />
					</Grid>
					<Grid item lg={12} md={12} xl={12} xs={12}>
						<TableAe list={this.props.data} />
					</Grid>
				</Grid>
			</div>
		)
	}
}

TopAe.propTypes = {
	getTopAe: PropTypes.func.isRequired,
	data: PropTypes.array.isRequired,
	grafik: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return{
		data: state.ae.top,
		grafik: state.ae.grafikTop
	}
}

export default connect(mapStateToProps, { getTopAe })(withStyles(styles)(TopAe));