import React from "react";
import PropTypes from "prop-types";
import {
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
	root: {
	  	width: '100%',
	    overflowX: 'auto',
	    height: '530px'
	},
	content: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '90%',
		display: 'flex'
	},
	label: {
    	textTransform: 'capitalize'
	},
	row: {
	  	whiteSpace: 'nowrap',
	  	fontSize: '12px'
	}
}))

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const TableKinerja = props => {
	const classes = useStyles();
	const { data } = props;

	const content 	= [];
	let groupByArea = '';
	var no 			= 1;
	if (data.length > 0) {
		for(var i = 0; i < data.length; i++){
			let item 	= data[i];
			let area 	= item.idwilayah;
			if (groupByArea !== area) {
				no = 1;
				groupByArea = area;
				content.push(
					<React.Fragment key={i}>
						<TableRow selected>
							<TableCell colSpan='9' align="left">AREA {area}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row">{no++}</TableCell>
				            <TableCell className={classes.row} align="left">{item.NamaKtr}</TableCell>
				            <TableCell className={classes.row} align="left">{item.idregpelanggan}</TableCell>
				            <TableCell className={classes.row} align="left">{item.nm_perusahaan}</TableCell>
				            <TableCell className={classes.row} align="left">{item.nama}</TableCell>
				            <TableCell className={classes.row} align="right">{numberWithCommas(item.produksi)}</TableCell>
				            <TableCell className={classes.row} align="right">{numberWithCommas(item.tot_bsu)}</TableCell>
						</TableRow>
					</React.Fragment>
				);
			}else{
				content.push(
					<TableRow key={i}>
						<TableCell component="th" scope="row">{no++}</TableCell>
			            <TableCell className={classes.row} align="left">{item.NamaKtr}</TableCell>
			            <TableCell className={classes.row} align="left">{item.idregpelanggan}</TableCell>
			            <TableCell className={classes.row} align="left">{item.nm_perusahaan}</TableCell>
			            <TableCell className={classes.row} align="left">{item.nama}</TableCell>
			            <TableCell className={classes.row} align="right">{numberWithCommas(item.produksi)}</TableCell>
			            <TableCell className={classes.row} align="right">{numberWithCommas(item.tot_bsu)}</TableCell>
					</TableRow>
				)
			}
		}
	}

	return(
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
		          <TableRow>
		            <TableCell align="left">NO</TableCell>
		            <TableCell align="left">KANTOR</TableCell>
		            <TableCell align="left">ID PELANGGAN</TableCell>
		            <TableCell align="left">NAMA PELANGGAN</TableCell>
		            <TableCell align="left">AE</TableCell>
		            <TableCell align="right">PRODUKSI</TableCell>
		            <TableCell align="right">PENDAPATAN</TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		        	{ content }
		        </TableBody>
			</Table>
			{ data.length === 0 && <div className={classes.content}>
				<Typography className={classes.label} variant="body2">
			        DATA KOSONG... KLIK TOMBOL TAMPILKAN UNTUK MENCARI DATA KINERJA ACCOUNT CUSTOMER
			    </Typography>
			</div>}
		</Paper>
	);
}

TableKinerja.propTypes = {
	data: PropTypes.array.isRequired
}

export default TableKinerja;