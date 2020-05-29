import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/styles';
import { 
	Grid, 
	Breadcrumbs, 
	Typography, 
	Paper,
	Fab,
	Backdrop,
	CircularProgress
} from '@material-ui/core';
import { connect } from "react-redux";
import { getTopKrpk } from "../../../actions/grafik";
import { Grafik, TableGrafik } from "./components";
import AssessmentIcon from '@material-ui/icons/Assessment';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { DatePicker } from "@material-ui/pickers";
import SearchIcon from '@material-ui/icons/Search';
import { convertMonthYear } from "../../../utils";

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
	},
	loadingBackdrop: {
	    zIndex: theme.zIndex.drawer + 1,
	    color: '#fff',
	},
	progress: {
	    zIndex: theme.zIndex.drawer + 2,
	    position: 'absolute',
	    margin: '0 0 0 0',
	    left: '50%',
	    top: '50%',
	    color: 'white'
	}
})


class TopKprk extends React.Component{
	state = {
		selectedDate: new Date(),
		loading: false
	}

	componentDidMount(){
		const value = convertMonthYear(new Date()).split('-');
		const payload = {
			year: value[0],
			month: value[1]
		}

		this.props.getTopKrpk(payload);
	}

	handleDateChange = (e) => this.setState({ selectedDate: e._d })

	onSearch = () => {
		const { selectedDate } = this.state;
		const startValue = convertMonthYear(selectedDate).split('-');

		const payload = {
			year: startValue[0],
			month: startValue[1]
		}

		this.setState({ loading: true });
		this.props.getTopKrpk(payload)
			.then(() => this.setState({ loading: false }))
	}

	render(){
		const { selectedDate, loading } = this.state;
		const { classes, searchParam } = this.props;

		return(
			<div className={classes.root}>
				<Backdrop className={classes.loadingBackdrop} open={loading} />
				{ loading && <CircularProgress className={classes.progress} /> }
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
			    <Paper className={classes.paper}>
				    <Grid container spacing={4}>
				    	<Grid item lg={3} md={3} xl={4} xs={4}>
				    		<DatePicker
						        openTo="year"
						        views={["year", "month"]}
						        label="Periode"
						        value={selectedDate}
						        onChange={this.handleDateChange}
						    />
				    	</Grid>
				    	<Grid item lg={3} md={3} xl={4} xs={4}>
				    		<Fab color="primary" aria-label="Add" size="medium" onClick={() => this.onSearch()}>
						        <SearchIcon />
						    </Fab>
						</Grid>
				    </Grid>
			    </Paper>
				<Grid container spacing={4}>
					<Grid item lg={6} md={6} xl={12} xs={12}>
						<Grafik data={this.props.grafik} param={searchParam} />
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
	getTopKrpk: PropTypes.func.isRequired,
	searchParam: PropTypes.string.isRequired
}

function mapStateToProp(state) {
	return{
		grafik: state.grafik.topKprk,
		searchParam: state.grafik.searchKprk
	}
}

export default connect(mapStateToProp, { getTopKrpk })(withStyles(styles)(TopKprk));