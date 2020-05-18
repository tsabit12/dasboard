import React from "react";
import { 
	Grid,
	Breadcrumbs,
	Typography,
	TablePagination
} from '@material-ui/core';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/styles';
import AssessmentIcon from '@material-ui/icons/Assessment';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import { connect } from "react-redux";
import { getMinus, getTotalRow } from "../../../actions/ae";
import { TableAe } from "./components";

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

class Ae extends React.Component{
	state = {
		offset: 1,
		limit: 11,
		page: 1
	}

	componentDidMount(){
		this.props.getTotalRow();
		this.props.getMinus(this.state);
	}

	handlePageChange = (event, page) => {
		this.setState({
			offset: (page *  11) - 10,
			limit: 11 * page,
			page
		});

		setTimeout(() => {
			this.props.getMinus(this.state);
		}, 30);
	}

	render(){

		const { classes, data } = this.props;

		return(
			<div elevation={0} className={classes.root}>
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
		          rowsPerPage={this.state.limit}
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