import React from 'react';
import { withStyles } from '@material-ui/styles';
import { connect } from "react-redux";
import { getTopProduk } from "../../../actions/produk";
import { 
	Grid,
	Paper,
	Backdrop,
	CircularProgress
} from '@material-ui/core';

import { 
	BarChart, 
	TableProduk ,
	FormSearch
} from "./components";
import { convertMonthYear } from "../../../utils";
import MessageInfo from "../MessageInfo";

const styles = theme => ({
	root: {
	    padding: theme.spacing(4)
	},
	paper: {
		marginBottom: '10px',
		paddingLeft: '20px'
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

class Dashboard extends React.Component{
	state = {
		isError: false,
		loading: false
	}

	componentDidMount(){
		const value = convertMonthYear(new Date()).split('-');
		const payload = {
			periode: `${value[0]}-${value[1]}`
		}
		this.props.getTopProduk(payload)
			.catch(err => this.setState({ isError: true }))
	}

	onSearch = (date) => {
		const value = convertMonthYear(date).split('-');
		const payload = {
			periode: `${value[0]}-${value[1]}`
		}
		//YYYY-MM
		this.setState({ loading: true, isError: false });

		this.props.getTopProduk(payload)
			.then(() => this.setState({ loading: false }))
			.catch(err => this.setState({ loading: false, isError: true }))
	}

	render(){
		const { classes, topProduk } = this.props;
		const { loading } = this.state;

		return(
			<div className={classes.root}>
				<React.Fragment>
					<Backdrop className={classes.loadingBackdrop} open={loading} />
					{ loading && <CircularProgress className={classes.progress} /> }

					<MessageInfo 
						open={this.state.isError} 
						variant="error" 
						message="Terdapat kesalahan"
						onClose={() => this.setState({ isError: false })} 
					/>
				</React.Fragment>
				<Paper className={classes.paper}>
					<Grid container spacing={4}>
						<FormSearch onSubmit={this.onSearch} />
					</Grid>
				</Paper>
				<Grid container spacing={4}>
				    <Grid item lg={6} md={6} xl={12} xs={12}>
			        	<BarChart 
			        		listproduk={topProduk} 
			        		error={this.state.isError} 
			        		search={this.props.param}
			        	/>
			        </Grid>
			        <Grid item lg={6} md={6} xl={6} xs={12}>	
			        	<TableProduk data={topProduk} />
			        </Grid>
			    </Grid>
		    </div>
		);
	}
}

function mapStateToProps(state) {
	return{
		topProduk: state.produk.data,
		param: state.produk.searchParam
	}
}

export default connect(mapStateToProps, { getTopProduk })(withStyles(styles)(Dashboard));

//example using redux
// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
