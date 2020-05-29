import React from "react";
import { 
	Grid,
	Breadcrumbs,
	Typography,
	Button
} from '@material-ui/core';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/styles';
import { 
	TableAe, 
	//GrafikAe 
} from "./components";
import AssessmentIcon from '@material-ui/icons/Assessment';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { connect } from "react-redux";
import { getTopAe } from "../../../actions/ae";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

// const dataSet1 = [
//     {
//         name: "Johson",
//         amount: 30000,
//         sex: 'M',
//         is_married: true
//     },
//     {
//         name: "Monika",
//         amount: 355000,
//         sex: 'F',
//         is_married: false
//     },
//     {
//         name: "John",
//         amount: 250000,
//         sex: 'M',
//         is_married: false
//     },
//     {
//         name: "Josef",
//         amount: 450500,
//         sex: 'M',
//         is_married: true
//     }
// ];

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
	iconBtn: {
		marginLeft: theme.spacing(1)
	}
})

class TopAe extends React.Component{
	componentDidMount(){
		this.props.getTopAe();
	}


	render(){
		const { classes } = this.props;

		return(
			<div elevation={0} className={classes.root}>
				<Grid container spacing={2} style={{display: 'flex', alignItems: 'center'}}>
					<Grid item lg={6} md={6} xl={6} xs={6}>
						<Breadcrumbs aria-label="Breadcrumb">
					        <div className={classes.link}>
						        <AssessmentIcon className={classes.icon} />
						        TOP BISNIS KORPORAT
					        </div>
					        <Typography color="textPrimary" className={classes.link}>
					          <WhatshotIcon className={classes.icon} />
					          TOP 100 AE (BULAN INI)
					        </Typography>
					    </Breadcrumbs>
				    </Grid>
				    <Grid item lg={6} md={6} xl={6} xs={6}>
				    	{ this.props.data.length > 0 && <ExcelFile
				    		element={
				    			<Button 
						    		variant="contained" 
						    		color="secondary" 
						    		style={{float: 'right'}} 
						    		size='medium'
						    	>
					        		Export to Excel
					        		<InsertDriveFileIcon className={classes.iconBtn} />
					    		</Button>
					    	}
					    	filename='topae'
				    	>
				            <ExcelSheet data={this.props.data} name="Employees">
				                <ExcelColumn label="Nama" value="nama"/>
				                <ExcelColumn label="Kantor" value="kantor"/>
				                <ExcelColumn label="Total" value="total"/>
				            </ExcelSheet>
				        </ExcelFile>}
				    </Grid>
			    </Grid>
				<Grid container spacing={2}>
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
	grafik: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return{
		data: state.ae.top,
		grafik: state.ae.grafikTop
	}
}

export default connect(mapStateToProps, { getTopAe })(withStyles(styles)(TopAe));