import React from "react";
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import PublicIcon from '@material-ui/icons/Public';
import clsx from "clsx";
import Loader from 'react-loader-spinner';

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
    backgroundColor: theme.palette.warning.main,
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
  },
  backdrop: {
    position: 'relative',
    background: 'black',
    opacity: 0.5,
    borderRadius: '5px' 
  }
}));

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


const TotalWeb = props => {
  const { total } = props;
	const classes = useStyles();
	return(
    <div className={ total === 0 ? classes.backdrop : ''}>
  		<Card className={clsx(classes.root)}>
      	<CardContent>
  	        <Grid container justify="space-between">
  	        	<Grid item>
  		            <Typography
  		              className={classes.title}
  		              color="textSecondary"
  		              gutterBottom
  		              variant="body2"
  		            >
  		              USER WEB
  		            </Typography>
  		            { total === 0 ? <Loader
                       type="TailSpin"
                       color="#00BFFF"
                       height={35}
                       width={35}
                    /> : <Typography variant="h3">{numberWithCommas(props.total)}</Typography> }
  	          	</Grid>
  	          	<Grid item>
  		            <Avatar className={classes.avatar}>
  		              <PublicIcon className={classes.icon} />
  		            </Avatar>
  		        </Grid>
  	        </Grid>
  	    </CardContent>
  		</Card>
    </div>
	);
}

export default TotalWeb;