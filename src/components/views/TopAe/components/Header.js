import React from "react";
import PropTypes from "prop-types";
import ReactExport from "react-export-excel";
import { makeStyles } from '@material-ui/styles'; 
import { 
	Grid,
	Breadcrumbs,
	Button,
	Typography
} from '@material-ui/core';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import AssessmentIcon from '@material-ui/icons/Assessment';
import WhatshotIcon from '@material-ui/icons/Whatshot';

const useStyles = makeStyles(theme => ({
  	icon: {
    	marginRight: theme.spacing(0.5),
    	width: 20,
    	height: 20,
  	},
  	iconBtn: {
		marginLeft: theme.spacing(1)
  	},
  	link: {
	    display: 'flex'
	},
}));

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


const Header = props => {
	const classes = useStyles();
	return(
		<Grid container spacing={2} style={{display: 'flex', alignItems: 'center'}}>
			<Grid item lg={8} md={8} xl={8} xs={8}>
				<Breadcrumbs aria-label="Breadcrumb">
			        <div className={classes.link}>
				        <AssessmentIcon className={classes.icon} />
				        TOP BISNIS KORPORAT
			        </div>
			        <Typography color="textPrimary" className={classes.link}>
			          <WhatshotIcon className={classes.icon} />
			          TOP 100 AE {props.title}
			        </Typography>
			    </Breadcrumbs>
		    </Grid>
		    <Grid item lg={4} md={4} xl={4} xs={6}>
		    	{ props.data.length > 0 && <ExcelFile
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
			    	filename={`topae${props.title}`}
		    	>
		            <ExcelSheet data={props.data} name="Employees">
		                <ExcelColumn label="Nama" value="nama"/>
		                <ExcelColumn label="Kantor" value="kantor"/>
		                <ExcelColumn label="Total" value="total"/>
		            </ExcelSheet>
		        </ExcelFile>}
		    </Grid>
	    </Grid>
	);
}

Header.propTypes = {
	data: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired
}

export default Header;