import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'; 
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
  	height: '580px',
    overflowX: 'auto',
  }
}));

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const TableProduk = props => {
	const { data } = props;
	var no = 1;
	const classes = useStyles();
	return(
		<Paper className={classes.root}>
		    <Table>
		        <TableHead>
		          <TableRow>
		            <TableCell align="left">NO</TableCell>
		            <TableCell align="left">PRODUK</TableCell>
		            <TableCell align="right">PRODUKSI</TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		          {data.map((row) => (
		            <TableRow key={row.deskripsi}>
		              <TableCell component="th" scope="row">
		                {no++}
		              </TableCell>
		              <TableCell align="left">{row.deskripsi}</TableCell>
		              <TableCell align="right">{numberWithCommas(Number(row.produksi))}</TableCell>
		            </TableRow>
		          ))}
		        </TableBody>
		    </Table>
		</Paper>

	);
}

TableProduk.propTypes = {
	data: PropTypes.array.isRequired	
}

export default TableProduk;