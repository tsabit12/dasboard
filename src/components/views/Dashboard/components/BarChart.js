import React from "react";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  LinearProgress,
  // Dialog,
  // DialogContent,
  // DialogContentText,
  // DialogTitle,
  // DialogActions
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'; 
import { options } from "./options";
import palette from '../../../../theme/palette';

const useStyles = makeStyles(() => ({
  root: {
  	height: '100%'
  },
  chartContainer: {
    height: '500px',
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  linear: {
  	marginTop: -18,
  	marginLeft: -16,
  	marginRight: -17
  }
}));

// const ModalDialog = props => {
// 	const [open, setOpen] = React.useState(true);

// 	const handleTryAgain = () => {
// 		setOpen(false);
// 		props.tryAgain();
// 	}

// 	const handleClose = () => {
// 		setOpen(false);
// 		props.onClose();
// 	}

// 	return(
// 		<Dialog
// 	        open={open}
// 	        aria-labelledby="alert-dialog-title"
// 	        aria-describedby="alert-dialog-description"
// 	        maxWidth='xs'
// 	      >
// 	        <DialogTitle id="alert-dialog-title">{"Oppps!"}</DialogTitle>
// 	        <DialogContent>
// 	          <DialogContentText id="alert-dialog-description">
// 	            Terdapat kesalahan saat mengambil atau memperbarui data grafik produk, ini terjadi karena server sedang sibuk sehingga
// 	            mengakibatkan gateway timeout. Harap pastikan kembali koneksi internet anda
// 	          </DialogContentText>
// 	        </DialogContent>
// 	        <DialogActions>
// 	          <Button onClick={handleClose} color="primary" autoFocus>
// 	            Tutup
// 	          </Button>
// 	          <Button onClick={handleTryAgain} color="primary" autoFocus>
// 	            Coba Lagi
// 	          </Button>
// 	        </DialogActions>
// 	    </Dialog>
// 	);
// }


const BarChart = props => {
	const { className, listproduk, search, ...rest } = props;
	const [formState, setState] = React.useState({
		loading: true,
		data: {
			labels: ['Memuat...'],
			datasets: [
			    {
			      label: 'Example',
			      backgroundColor: palette.primary.main,
			      data: [0]
			    }
			]
		}
	});

	React.useEffect(() => {
		const datasets = [];
		const labels   = [];
		if (listproduk.length > 0) {
			listproduk.slice(0, 10).forEach(product => {
				datasets.push(Number(product.produksi));
				labels.push(product.deskripsi);
			})

			setState(prevState => ({
				...prevState, 
				loading: false,
				data:{
					labels: labels,
					datasets: [{
						label: 'Produksi',
						backgroundColor: palette.primary.main,
						data: datasets
					}]
				}
			})) 
		}
	}, [listproduk])

	const classes = useStyles();

	return(
		<React.Fragment>
			<Card
		      {...rest}
		      className={clsx(classes.root, className)}
		    >
		    	<CardHeader title={`TOP PRODUK ${search}`}/>
			    <Divider />
			    <CardContent>
			        <div className={classes.chartContainer}>
			        	{ formState.loading && <LinearProgress className={classes.linear} />}
			          	<Bar
				            data={formState.data}
				            options={options}
				        />
			        </div>
			    </CardContent>
		    </Card>
	    </React.Fragment>
	);
}

BarChart.propTypes = {
  className: PropTypes.string,
  listproduk: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired
};

export default BarChart;