import React from "react";
import { withStyles } from '@material-ui/styles';
import PropTypes from "prop-types";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import {
	Breadcrumbs,
	Typography,
	Paper,
	Grid,
	Button
} from "@material-ui/core";
import { SearchParam, TableKinerja } from "./components";
import { connect } from "react-redux";
import { getRegional, getKinerja } from "../../../actions/report";
import api from "../../../api";
import { convertDay } from "../../../utils";
import LoaderBackdrop from "../LoaderBackdrop";
import MessageInfo from "../MessageInfo";
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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
	},
	rightIcon: {
	    marginLeft: theme.spacing(1),
	},
	button: {
	    marginBottom: theme.spacing(1),
	    backgroundColor: 'rgb(220, 0, 78)',
	    color: "#FFFF",
	    "&:hover": {
	      backgroundColor: 'rgb(167, 0, 59)'
	    },
	    marginTop: '12px',
	    float: 'right'
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
		const { classes, area, data } = this.props;
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
			    		<Grid item lg={10} md={12} xl={12} xs={12}>
				    		<SearchParam 
				    			area={area}
				    			getKprk={this.getKprk}
				    			listKprk={this.state.kprk}
				    			onSubmit={this.onSearch}
				    			value={data.searchParams}
				    		/>
			    		</Grid>
			    		<Grid item lg={2} md={2} xl={2} xs={2}>
			    			{ data.data.length > 0 && <ExcelFile
						    		element={
						    			<Button variant="contained" className={classes.button}>
									        Excel
									        <SaveAltIcon className={classes.rightIcon} />
									    </Button>
							    	}
							    	filename={`kinerja_account_customer(${convertDay(data.searchParams.start)} sd ${convertDay(data.searchParams.end)})`}
						    	>
						            <ExcelSheet data={data.data} name="Kinerja Account Customer">
						                <ExcelColumn label="Wilayah" value="idwilayah"/>
						                <ExcelColumn label="Kantor" value="NamaKtr"/>
						                <ExcelColumn label="Id Pelanggan" value="idregpelanggan"/>
						                <ExcelColumn label="Nama Pelanggan" value="nm_perusahaan"/>
						                <ExcelColumn label="AE" value="nama"/>
						                <ExcelColumn label="Produksi" value="produksi"/>
						                <ExcelColumn label="Pendapatan" value="tot_bsu"/>
						            </ExcelSheet>
						    </ExcelFile> }
						</Grid>
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