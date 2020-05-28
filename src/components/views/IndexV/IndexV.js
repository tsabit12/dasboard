import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
	Grid
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	card: {
	    maxWidth: 430,
	},
	root: {
		padding: theme.spacing(3)
	},
	img: {
		width: '100%',
		height: 250
	}
}))

const IndexV = props => {
	const classes = useStyles();

	return(
		<div className={classes.root}>
			<Grid container spacing={2}>
				<Grid item lg={3} md={12} xl={12} xs={12}>
					<Card className={classes.card} variant="outlined" onClick={() => props.history.push("/home-sales")}>
				      <CardActionArea>
				        <CardMedia>
					      <img 
					      	src={`${process.env.REACT_APP_PUBLIC_URL}/images/products/sales.png`}
					      	className={classes.img}
					      	alt='oke'
					      />
					    </CardMedia>
				        <CardContent>
				          <Typography gutterBottom variant="h5" component="h2">
				            SALES FORCE
				          </Typography>
				        </CardContent>
				      </CardActionArea>
				    </Card>
			    </Grid>
			    <Grid item lg={3} md={12} xl={12} xs={12}>
			    	<Card className={classes.card} variant="outlined" onClick={() => props.history.push("/qposin")}>
				      <CardActionArea>
				        <CardMedia>
					      <img 
					      	src={`${process.env.REACT_APP_PUBLIC_URL}/images/products/qposin-view.png`}
					      	className={classes.img}
					      	alt='oke'
					      />
					    </CardMedia>
				        <CardContent>
				          <Typography gutterBottom variant="h5" component="h2">
				            QPOSIN
				          </Typography>
				        </CardContent>
				      </CardActionArea>
				    </Card>
			    </Grid>
		    </Grid>
	    </div>
	);
}

export default IndexV;