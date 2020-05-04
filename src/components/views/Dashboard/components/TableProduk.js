import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'; 
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  chartContainer: {
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  table: {
    minWidth: 650,
  },
}));

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const TableProduk = props => {
	const { data } = props;
	var no = 1;
	const classes = useStyles();
	return(
		<Card>
			<CardHeader title="OVERVIEW GRAFIK PRODUK"/>
		    <Divider />
		    <CardContent>
		      <Table className={classes.table} aria-label="simple table">
		        <TableHead>
		          <TableRow>
		            <TableCell align="left">NO</TableCell>
		            <TableCell align="left">PRODUK</TableCell>
		            <TableCell align="right">BULAN INI</TableCell>
		            <TableCell align="right">BULAN SEBELUMNYA</TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		          {data.map((row) => (
		            <TableRow key={row.deskripsi}>
		              <TableCell component="th" scope="row">
		                {no++}
		              </TableCell>
		              <TableCell align="left">{row.deskripsi}</TableCell>
		              <TableCell align="right">{numberWithCommas(Math.round(row.bsu))}</TableCell>
		              <TableCell align="right">{numberWithCommas(Math.round(row.old_bsu))}</TableCell>
		            </TableRow>
		          ))}
		        </TableBody>
		      </Table>
		    </CardContent>
		</Card>
	);
}

TableProduk.propTypes = {
	data: PropTypes.array.isRequired	
}

export default TableProduk;