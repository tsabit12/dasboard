import React from "react";
import { connect } from "react-redux";
import { getUser, getJml } from "../../../actions/qposin";
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { TotalUser, TotalUpdate, TotalInstall, TotalUninstall } from "./components";


const styles = theme => ({
	root: {
	    padding: theme.spacing(4)
	}
})

class Home extends React.Component{
	componentDidMount(){
		const payload = {
			sp_nama: 'sp_getreportuser',
			par_data: '00|okeoke'
		}
		this.props.getJml(payload);
		// setTimeout(() => {
		// 	this.props.getUser(payload);
		// }, 100);
	}

	render(){
		const { classes, jumlah } = this.props;
		return(
			<div elevation={0} className={classes.root}>
				<Grid container spacing={4}>
			        <Grid
			          item
			          lg={3}
			          sm={3}
			          xl={3}
			          xs={12}
			        >
			          <TotalUser total={jumlah.user} />
			       	</Grid>
			       	<Grid
			          item
			          lg={3}
			          sm={3}
			          xl={3}
			          xs={12}
			        >
			          <TotalInstall total={jumlah.install} />
			       	</Grid>
			       	<Grid
			          item
			          lg={3}
			          sm={3}
			          xl={3}
			          xs={12}
			        >
			          <TotalUpdate total={jumlah.update} />
			       	</Grid>
			       	<Grid
			          item
			          lg={3}
			          sm={3}
			          xl={3}
			          xs={12}
			        >
			          <TotalUninstall total={jumlah.uninstall} />
			       	</Grid>
			    </Grid>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return{
		jumlah: state.qposin.jmlData
	}
}

export default connect(mapStateToProps, { getUser, getJml })(withStyles(styles)(Home));