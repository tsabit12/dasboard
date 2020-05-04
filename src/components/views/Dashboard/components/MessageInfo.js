import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'; 
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    position: 'relative'
  },
  info: {
  	backgroundColor: '#07ecc2'
  },
  title: {
  	textAlign: 'justify'
  }
}));

const MessageInfo = () => {
	const classes = useStyles();
	return(
		<Card className={clsx(classes.root)}>
			<CardHeader title="INFO" className={classes.info}/>
			<Divider />
			<CardContent>
		        <div className={classes.chartContainer}>
		        	<Typography
	                  className={classes.title}
	                  variant="body1"
	                >
	                  Produk yang ditampilkan pada grafik hanyalah top 10 saja. Untuk melihat keseluruhan produk silahkan klik tombol OVERVIEW yang ada di bawah grafik produk.
	                  Tombol OVERVIEW hanya bisa di klik jika data grafik sudah muncul
	                </Typography>
		        </div>
		    </CardContent>
		</Card>
	);
}

export default MessageInfo;