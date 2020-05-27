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
	ProdukReport,
	TotalWeb
} from "./components";


const styles = theme => ({
	root: {
	    padding: theme.spacing(4)
	}
})

class Home extends React.Component{
	componentDidMount(){
		
		const payload = {
			jenis: 3,
			name: 'all'
		}

		this.props.getJml();
		
		setTimeout(() => {
			this.props.reportPerWeek(payload)
				.then(() => this.props.getReportProduk())
				.catch(err => alert("FAILED GET GRAFIK"))
		}, 100);
	}

	handleChangeGrafik = (payload) => this.props.reportPerWeek(payload);

	render(){
		const { classes, jumlah, grafik, produk, search } = this.props;
		return(
			<div elevation={0} className={classes.root}>
				<Grid container spacing={4}>
			       	<Grid
			          item
			          lg={3}
			          sm={12}
			          xl={12}
			          xs={12}
			        >
			          <TotalInstall total={jumlah.install} />
			       	</Grid>
			       	<Grid
			          item
			          lg={3}
			          sm={12}
			          xl={12}
			          xs={12}
			        >
			          <TotalMobile total={jumlah.mobile} />
			       	</Grid>
			       	<Grid
			          item
			          lg={3}
			          sm={12}
			          xl={12}
			          xs={12}
			        >
			          <TotalWeb total={jumlah.uninstall} />
			       	</Grid>
			        <Grid
			          item
			          lg={3}
			          sm={12}
			          xl={12}
			          xs={12}
			        >
			          <TotalUser total={jumlah.user} />
			       	</Grid>
			    </Grid>
			    <Grid container spacing={4}>
			    	<Grid
			          item
			          lg={8}
			          sm={12}
			          xl={12}
			          xs={12}
			        >
			          <Grafik 
			          	list={grafik} 
			          	search={search} 
			          	getNewGrafik={this.handleChangeGrafik}
			          />
			       	</Grid>
			       	<Grid
			          item
			          lg={4}
			          sm={12}
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
	grafik: PropTypes.object.isRequired,
	reportPerWeek: PropTypes.func.isRequired,
	getReportProduk: PropTypes.func.isRequired,
	getJml: PropTypes.func.isRequired,
	produk: PropTypes.array.isRequired,
	search: PropTypes.string.isRequired
}

function mapStateToProps(state) {
	return{
		jumlah: state.qposin.jmlData,
		grafik: state.qposin.grafik.order,
		produk: state.qposin.grafik.produk,
		search: state.qposin.grafik.searchParams
	}
}

export default connect(mapStateToProps, { getUser, getJml, reportPerWeek, getReportProduk })(withStyles(styles)(Home));