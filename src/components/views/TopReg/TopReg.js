import React from "react";
import { withStyles } from '@material-ui/styles';
import { Grid, Breadcrumbs, Typography, Paper, Fab, Backdrop, CircularProgress } from '@material-ui/core';
import { GrafikPendapatan, PieChart } from "./components";
import { connect } from "react-redux";
import { getToReg } from "../../../actions/grafik";
import PropTypes from "prop-types";
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
	backdrop: {
	    position: 'relative',
	    background: 'black',
	    opacity: 0.5,
	    borderRadius: '5px' 
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

class TopReg extends React.Component{
	state={
		selectedDate: new Date(),
		loading: false
	}

	componentDidMount(){
		const value = convertMonthYear(new Date()).split('-');
		const payload = {
			year: value[0],
			month: value[1]
		}
		this.props.getToReg(payload)
			.catch(err => console.log(err))
	}

	handleDateChange = (e) => this.setState({ selectedDate: e._d })

	onSearch = () => {
		// e.preventDefault();
		const { selectedDate } = this.state;
		const startValue = convertMonthYear(selectedDate).split('-');
		const payload = {
			year: startValue[0],
			month: startValue[1]
		}

		this.setState({ loading: true });
		this.props.getToReg(payload)
			.then(() => this.setState({ loading: false }));

	}

	render(){
		const { classes } = this.props;
		const { grafik, param } = this.props;
		const { selectedDate, loading } = this.state;

		return(
			<div elevation={0} className={classes.root}>
				<Backdrop className={classes.loadingBackdrop} open={loading} />
        		{ loading && <CircularProgress className={classes.progress} /> }
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
			    <Paper className={classes.paper}>
			    	<Grid container spacing={2}>
			    		<Grid item lg={3} md={3} xl={4} xs={4}>
							<DatePicker
						        openTo="year"
						        views={["year", "month"]}
						        label="Mulai"
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
				<Grid container spacing={2}>
					<Grid item lg={8} md={8} xl={12} xs={12}>
						<div className={ grafik.length === 0 ? classes.backdrop : ''}>
							<GrafikPendapatan data={grafik} param={param} />
						</div>
					</Grid>
					<Grid item lg={4} md={4} xl={12} xs={12}>
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
	grafik: PropTypes.array.isRequired,
	param: PropTypes.string.isRequired
}

function mapStateToProps(state) {
	return{
		grafik: state.grafik.topReg,
		param: state.grafik.searchReg
	}
}

export default connect(mapStateToProps, { getToReg })(withStyles(styles)(TopReg));