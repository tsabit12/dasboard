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
import { SearchParam, TableKinerja } from "./components";
import { connect } from "react-redux";
import { getRegional, getKinerja } from "../../../actions/report";
import api from "../../../api";
import { convertDay } from "../../../utils";
import LoaderBackdrop from "../LoaderBackdrop";
import MessageInfo from "../MessageInfo";

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
		kprk: [],
		loading: false,
		errors: {}
	}

	componentDidMount(){
		this.props.getRegional();
	}

	getKprk = (area) => {
		api.report.getKprk(area)
			.then(res => this.setState({ kprk: res }))
	} 

	onSearch = (param) => {
		this.setState({ loading: true, errors: {} });
		const payload = {
			...param,
			start: convertDay(param.start),
			end: convertDay(param.end),
			startValue: param.start,
			endValue: param.end
		}

		this.props.getKinerja(payload)
			.then(() => this.setState({ loading: false }))
			.catch(err => {
				if (err.response) {
					const { data } = err.response;
					this.setState({ errors: data.errors, loading: false });
				}else{
					this.setState({ loading: false, errors: { global: 'Terdapat kesalahan, silahkan cobalagi nanti'}});
				}
			})
	}

	render(){
		const { classes, area } = this.props;
		const { errors } = this.state;

		return(
			<div elevation={0} className={classes.root}>
				<MessageInfo 
					open={!!errors.global} 
					variant="error" 
					message={errors.global}
					onClose={() => this.setState({ errors: {} })} 
				/>

				<LoaderBackdrop loading={this.state.loading} />
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
			    			value={this.props.data.searchParams}
			    		/>
			    	</Grid>
			    </Paper>
			    <Grid container spacing={4}>
			    	<Grid item lg={12} md={12} xl={12} xs={12}>
			    		<TableKinerja 
			    			data={this.props.data.data}
			    		/>
			    	</Grid>
			    </Grid>
			</div>
		);
	}
}

KinerjaAc.propTypes = {
	getRegional: PropTypes.func.isRequired,
	area: PropTypes.array.isRequired,
	getKinerja: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return{
		area: state.report.area,
		data: state.report.kinerja
	}
}

export default connect(mapStateToProps, { getRegional, getKinerja })(withStyles(styles)(KinerjaAc));