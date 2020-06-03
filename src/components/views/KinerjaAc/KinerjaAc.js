import React from "react";
import { withStyles } from '@material-ui/styles';
import PropTypes from "prop-types";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import {
	Breadcrumbs,
	Typography,
	Paper,
	Grid
} from "@material-ui/core";
import { SearchParam } from "./components";
import { connect } from "react-redux";
import { getRegional } from "../../../actions/report";
import api from "../../../api";
import { convertDay } from "../../../utils";

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
	},
	paper: {
		padding: '15px',
		marginBottom: '10px',
		marginTop: '10px'
	}
})

class KinerjaAc extends React.Component{
	state = {
		kprk: []
	}

	componentDidMount(){
		this.props.getRegional();
	}

	getKprk = (area) => {
		api.report.getKprk(area)
			.then(res => this.setState({ kprk: res }))
	} 

	onSearch = (param) => {
		const payload = {
			...param,
			start: convertDay(param.start),
			end: convertDay(param.end)
		}

		console.log(payload);
	}

	render(){
		const { classes, area } = this.props;
		return(
			<div elevation={0} className={classes.root}>
				<Breadcrumbs aria-label="Breadcrumb">
			        <div className={classes.link}>
			        	<AssignmentTurnedInIcon className={classes.icon} />
				        LAPORAN KORPORAT
			        </div>
			        <Typography color="textPrimary" className={classes.link}>
			          <WhatshotIcon className={classes.icon} />
			          KINERJA ACCOUNT CUSTOMER
			        </Typography>
			    </Breadcrumbs>
			    <Paper className={classes.paper}>
			    	<Grid container spacing={4}>
			    		<SearchParam 
			    			area={area}
			    			getKprk={this.getKprk}
			    			listKprk={this.state.kprk}
			    			onSubmit={this.onSearch}
			    		/>
			    	</Grid>
			    </Paper>
			</div>
		);
	}
}

KinerjaAc.propTypes = {
	getRegional: PropTypes.func.isRequired,
	area: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return{
		area: state.report.area
	}
}

export default connect(mapStateToProps, { getRegional })(withStyles(styles)(KinerjaAc));