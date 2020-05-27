import React from 'react';
import { withStyles } from '@material-ui/styles';
import { connect } from "react-redux";
import { getTopProduk } from "../../../actions/produk";
import { Grid } from '@material-ui/core';

import { 
	BarChart, 
	//MessageInfo, 
	TableProduk 
} from "./components";

const styles = theme => ({
	root: {
	    padding: theme.spacing(4)
	  }
})

class Dashboard extends React.Component{
	state = {
		isError: false,
		table: false
	}
	componentDidMount(){
		this.getProduk();
	}

	getProduk = () => 
		this.props.getTopProduk()
			.catch(() => this.setState({ isError: true }))

	handleTryAgain = () => {
		this.setState({ isError: false });
		this.getProduk();
	}

	render(){
		const { classes, topProduk } = this.props;

		return(
			<div className={classes.root}>
				<Grid 
					container
			        spacing={4}
			    >
				    <Grid
			          item
			          lg={12}
			          md={12}
			          xl={12}
			          xs={12}
			        >
			        	<BarChart 
			        		listproduk={topProduk} 
			        		error={this.state.isError} 
			        		onTryAgain={this.handleTryAgain}
			        		showTable={() => this.setState({ table: !this.state.table })}
			        		isShowTable={this.state.table}
			        	/>
			        </Grid>
			        { this.state.table && <Grid
			        	  item
				          lg={12}
				          md={12}
				          xl={12}
				          xs={12}
			        	>	
			        		<TableProduk data={topProduk} />
			        	</Grid> }
			    </Grid>
		    </div>
		);
	}
}

function mapStateToProps(state) {
	return{
		topProduk: state.produk
	}
}

export default connect(mapStateToProps, { getTopProduk })(withStyles(styles)(Dashboard));

//example using redux
// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
