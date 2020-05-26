import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { 
	getUser, 
	getJml, 
	reportPerWeek,
	getReportProduk 
} from "../../../actions/qposin";
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { 
	TotalUser, 
	TotalMobile, 
	TotalInstall, 
	Grafik,
	ProdukReport
} from "./components";


const styles = theme => ({
	root: {
	    padding: theme.spacing(4)
	}
})

class Home extends React.Component{
	componentDidMount(){
		// const payload = {
		// 	sp_nama: 'sp_getreportuser',
		// 	par_data: '00|okeoke'
		// }
		this.props.getJml();
		setTimeout(() => {
			this.props.reportPerWeek()
				.then(() => this.props.getReportProduk())
				.catch(err => alert("FAILED GET GRAFIK"))
		}, 100);
	}

	render(){
		const { classes, jumlah, grafik, produk } = this.props;
		return(
			<div elevation={0} className={classes.root}>
				<Grid container spacing={4}>
			        <Grid
			          item
			          lg={4}
			          sm={4}
			          xl={4}
			          xs={12}
			        >
			          <TotalUser total={jumlah.user} />
			       	</Grid>
			       	<Grid
			          item
			          lg={4}
			          sm={4}
			          xl={4}
			          xs={12}
			        >
			          <TotalMobile total={jumlah.mobile} />
			       	</Grid>
			       	<Grid
			          item
			          lg={4}
			          sm={4}
			          xl={4}
			          xs={12}
			        >
			          <TotalInstall total={jumlah.install} />
			       	</Grid>
			    </Grid>
			    <Grid container spacing={4}>
			    	<Grid
			          item
			          lg={8}
			          sm={8}
			          xl={12}
			          xs={12}
			        >
			          <Grafik list={grafik} />
			       	</Grid>
			       	<Grid
			          item
			          lg={4}
			          sm={4}
			          xl={12}
			          xs={12}
			        >
			          <ProdukReport list={produk} />
			       	</Grid>
			    </Grid>
			</div>
		);
	}
}

Home.propTypes = {
	jumlah: PropTypes.object.isRequired,
	grafik: PropTypes.array.isRequired,
	reportPerWeek: PropTypes.func.isRequired,
	getReportProduk: PropTypes.func.isRequired,
	getJml: PropTypes.func.isRequired,
	produk: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return{
		jumlah: state.qposin.jmlData,
		grafik: state.qposin.grafik.order,
		produk: state.qposin.grafik.produk
	}
}

export default connect(mapStateToProps, { getUser, getJml, reportPerWeek, getReportProduk })(withStyles(styles)(Home));