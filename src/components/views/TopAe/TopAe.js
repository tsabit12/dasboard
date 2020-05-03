import React from "react";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}))

const TopAe = () => {
	const classes = useStyles();
	
	return(
		<div className={classes.root}>
			<h3>Top 100 AE</h3>
		</div>
	);
}

export default TopAe;