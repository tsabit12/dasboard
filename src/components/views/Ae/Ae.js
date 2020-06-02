import React from "react";
import { 
	Grid,
	Breadcrumbs,
	Typography,
	TablePagination,
	Backdrop,
	CircularProgress
} from '@material-ui/core';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/styles';
import AssessmentIcon from '@material-ui/icons/Assessment';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import { connect } from "react-redux";
import { getMinus, getTotalRow } from "../../../actions/ae";
import { 
	TableAe,
	InputDate
} from "./components";
import { convertMonthYear } from "../../../utils";
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
	rightItems: {
		float: 'right'
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

class Ae extends React.Component{
	state = {
		offset: 1,
		limit: 11,
		page: 0,
		loading: false,
		periode: null,
		errors: {}
	}

	componentDidMount(){
		const value 	= convertMonthYear(new Date()).split('-');
		const periode 	= `${value[0]}-${value[1]}`;
		const payload 	= {
			offset: 1,
			limit: 11,
			periode
		}
		this.setState({ periode });
		this.props.getTotalRow(periode);
		this.props.getMinus(payload)
			.catch(err => {
				if (err.response) {
					const { errors } = err.response.data;
					this.setState({ errors });
				}else{
					this.setState({ errors: { periode: 'Terdapat kesalahan'}});
				}
			})
	}

	handlePageChange = (event, page) => {
		this.setState({
			offset: (page *  11) + 1,
			limit: (page + 1) * 11,
			page
		});

		setTimeout(() => {
			this.props.getMinus(this.state);
		}, 30);
	}

	onSearch = (date) => {
		const value	 	= convertMonthYear(date).split('-');
		const periode 	= `${value[0]}-${value[1]}`;
		const payload 	= {
			offset: this.state.offset,
			limit: this.state.limit,
			periode
		}
		this.setState({ loading: true, periode, errors: {} });

		this.props.getTotalRow(periode);
		this.props.getMinus(payload)
			.then(() => this.setState({ loading: false }))
			.catch(err => {
				if (err.response) {
					const { errors } = err.response.data;
					this.setState({ loading: false, errors });
				}else{
					this.setState({ 
						loading: false, 
						errors: {
							periode: 'Terdapat kesalahan'
						}
					});
				}
			});
		// console.log(payload);
	}

	render(){
		const { classes, data } = this.props;
		const { loading, errors } = this.state;

		return(
			<div elevation={0} className={classes.root}>
				<MessageInfo 
					open={!!errors.periode} 
					variant="error" 
					message={errors.periode}
					onClose={() => this.setState({ errors: {} })} 
				/>

				<Backdrop className={classes.loadingBackdrop} open={loading} />
				{ loading && <CircularProgress className={classes.progress} /> }

				<Grid container spacing={2} justify="space-between" alignItems="center">
					<Grid item lg={6} md={6} xl={6} xs={6}>
						<Breadcrumbs aria-label="Breadcrumb">
					        <div className={classes.link}>
						        <AssessmentIcon className={classes.icon} />
						        TOP BISNIS KORPORAT
					        </div>
					        <Typography color="textPrimary" className={classes.link}>
					          <NotificationImportantIcon className={classes.icon} />
					          AE DIBAWAH 15JT
					        </Typography>
					    </Breadcrumbs>
				    </Grid>
				    <Grid item lg={6} md={6} xl={6} xs={6}>
				    	<div className={classes.rightItems}>
				    		<InputDate submit={this.onSearch} />
				    	</div>
				    </Grid>
			    </Grid>
				<Grid container spacing={2}>
					<Grid item lg={12} md={12} xl={12} xs={12}>
						<TableAe 
							list={data}
							offset={this.state.offset}
						/>
					</Grid>
				</Grid>
				<TablePagination
		          component="div"
		          count={this.props.total}
		          onChangePage={this.handlePageChange}
		          //onChangeRowsPerPage={handleRowsPerPageChange}
		          page={this.state.page}
		          labelDisplayedRows={() => `Displaying pages ${this.state.offset}-${this.state.limit} of total ${this.props.total} pages`}
		          rowsPerPage={11}
		          // rowsPerPageOptions={[5, 10, 25]}
		        />
			</div>
		)
	}
}

Ae.propTypes = {
	getMinus: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
	getTotalRow: PropTypes.func.isRequired,
	total: PropTypes.number.isRequired
}

function mapStateToProps(state) {
	return{
		data: state.ae.minus.data,
		total: state.ae.minus.totalRow
	}
}

export default connect(mapStateToProps, { getMinus, getTotalRow })(withStyles(styles)(Ae));