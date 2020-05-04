import React from "react";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  LinearProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'; 
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { options } from "./options";
import palette from '../../../../theme/palette';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
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

const ModalDialog = props => {
	const [open, setOpen] = React.useState(true);

	const handleTryAgain = () => {
		setOpen(false);
		props.tryAgain();
	}

	const handleClose = () => {
		setOpen(false);
		props.onClose();
	}

	return(
		<Dialog
	        open={open}
	        aria-labelledby="alert-dialog-title"
	        aria-describedby="alert-dialog-description"
	        maxWidth='xs'
	      >
	        <DialogTitle id="alert-dialog-title">{"Oppps!"}</DialogTitle>
	        <DialogContent>
	          <DialogContentText id="alert-dialog-description">
	            Terdapat kesalahan saat mengambil atau memperbarui data grafik produk, ini terjadi karena server sedang sibuk sehingga
	            mengakibatkan gateway timeout. Harap pastikan kembali koneksi internet anda
	          </DialogContentText>
	        </DialogContent>
	        <DialogActions>
	          <Button onClick={handleClose} color="primary" autoFocus>
	            Tutup
	          </Button>
	          <Button onClick={handleTryAgain} color="primary" autoFocus>
	            Coba Lagi
	          </Button>
	        </DialogActions>
	    </Dialog>
	);
}


const BarChart = props => {
	const { className, listproduk, error, onTryAgain, showTable, ...rest } = props;
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
		const datasetsOld = [];
		const labels   = [];
		if (listproduk.length > 0) {
			listproduk.slice(0, 10).forEach(product => {
				datasets.push(Math.round(product.bsu));
				datasetsOld.push(Math.round(product.old_bsu));
				labels.push(product.deskripsi);
			})

			setState(prevState => ({
				...prevState, 
				loading: false,
				data:{
					labels: labels,
					datasets: [{
						label: 'Bulan Ini',
						backgroundColor: palette.primary.main,
						data: datasets
					},{
						label: 'Bulan Sebelumnya',
						backgroundColor: palette.info.dark,
						data: datasetsOld 
					}]
				}
			})) 
		}
	}, [listproduk])

	const handleClose = () => {
		if (listproduk.length <= 0) {
			setState(prevState => ({
				...prevState,
				loading: false,
				data: {
					...prevState.data,
					labels: ['Tidak dapat memuat data']
				}
			}))		
		}
	} 

	const onOverview = () => {
		if (listproduk.length > 0) {
			showTable();
		}
	}

	const classes = useStyles();

	return(
		<React.Fragment>
			{ error && <ModalDialog 
				tryAgain={() => onTryAgain()} 
				onClose={() => handleClose()}
			/> }
			<Card
		      {...rest}
		      className={clsx(classes.root, className)}
		    >
		    	<CardHeader
			        action={
			          <Button
			            size="small"
			            variant="text"
			          >
			            BULAN INI <ArrowDropDownIcon />
			          </Button>
			        }
			        title="TOP PRODUK"
			    />
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
			    <Divider/>
			    <CardActions className={classes.actions}>
			        <Button
			          color="primary"
			          size="small"
			          variant="text"
			          onClick={onOverview}
			          disabled={listproduk.length > 0 ? false : true }
			        >
			          Overview <ArrowRightIcon />
			        </Button>
			    </CardActions>
		    </Card>
	    </React.Fragment>
	);
}

BarChart.propTypes = {
  className: PropTypes.string,
  listproduk: PropTypes.array.isRequired,
  error: PropTypes.bool.isRequired,
  onTryAgain: PropTypes.func.isRequired,
  showTable: PropTypes.func.isRequired
};

export default BarChart;