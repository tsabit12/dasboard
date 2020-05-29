import React from "react";
import { 
	Grid,
	Paper
} from '@material-ui/core';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/styles';
import { 
	TableAe, 
	//GrafikAe,
	Header,
	InputDate
} from "./components";
import { connect } from "react-redux";
import { getTopAe } from "../../../actions/ae";
import LoaderBackdrop from "../LoaderBackdrop";
import MessageInfo from "../MessageInfo";

const styles = theme => ({
	root: {
	    padding: theme.spacing(4)
	},
	paper: {
		padding: '10px',
		marginTop: '10px'
	}
})

class TopAe extends React.Component{
	state = {
		loading: false,
		open: false
	}

	onSearch = (payload) => {
		this.setState({ loading: true });
		this.props.getTopAe(payload)
			.then(() => this.setState({ loading: false }))
			.catch(() => this.setState({ loading: false, open: true }))
	}

	render(){
		const { classes, data, title } = this.props;

		return(
			<div elevation={0} className={classes.root}>
				<MessageInfo 
					open={this.state.open} 
					variant="error" 
					message="Terdapat kesalahan"
					onClose={() => this.setState({ open: false })} 
				/>

				<LoaderBackdrop loading={this.state.loading} />
				{ title.start !== null ? <Header 
					data={data} 
					title={`(${title.start} sampai ${title.end})`} 
				/> : <Header 
					data={data} 
					title=''
				/>}
				<Paper className={classes.paper}>
					<InputDate submit={this.onSearch} />
				</Paper>
				<Grid container spacing={2} style={{marginTop: '5px'}}>
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
	grafik: PropTypes.array.isRequired,
	title: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return{
		data: state.ae.top,
		grafik: state.ae.grafikTop,
		title: state.ae.searchParamTop
	}
}

export default connect(mapStateToProps, { getTopAe })(withStyles(styles)(TopAe));