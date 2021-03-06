import React from "react";
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.dark,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


const TotalUninstall = props => {
	const classes = useStyles();
	return(
		<Card
	      className={clsx(classes.root)}
	    >
	    	<CardContent>
		        <Grid container justify="space-between">
		        	<Grid item>
			            <Typography
			              className={classes.title}
			              color="textSecondary"
			              gutterBottom
			              variant="body2"
			            >
			              TOTAL UNINSTALL
			            </Typography>
			            <Typography variant="h3">{numberWithCommas(props.total)}</Typography>
		          	</Grid>
		          	<Grid item>
			            <Avatar className={classes.avatar}>
			              <DeleteIcon className={classes.icon} />
			            </Avatar>
			        </Grid>
		        </Grid>
		    </CardContent>
		</Card>
	);
}

export default TotalUninstall;