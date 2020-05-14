import React from "react";
import { 
	Grid,
	Breadcrumbs,
	Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { TableAe } from "./components";
import AssessmentIcon from '@material-ui/icons/Assessment';
import WhatshotIcon from '@material-ui/icons/Whatshot';

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

class TopAe extends React.Component{
	render(){
		const { classes } = this.props;

		return(
			<div elevation={0} className={classes.root}>
				<Breadcrumbs aria-label="Breadcrumb">
			        <div className={classes.link}>
				        <AssessmentIcon className={classes.icon} />
				        TOP BISNIS KORPORAT
			        </div>
			        <Typography color="textPrimary" className={classes.link}>
			          <WhatshotIcon className={classes.icon} />
			          TOP 100 AE
			        </Typography>
			    </Breadcrumbs>
				<Grid container spacing={4}>
					<Grid item lg={12} md={12} xl={12} xs={12}>
						<TableAe />
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default withStyles(styles)(TopAe);