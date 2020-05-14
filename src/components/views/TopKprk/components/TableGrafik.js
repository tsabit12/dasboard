import React from "react";
import { makeStyles } from '@material-ui/styles'; 
import PropTypes from "prop-types";
import {
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
  	width: '100%',
    overflowX: 'auto',
    height: '600px',
    marginTop: '10px'
  },
  table: {
    minWidth: 650,
  },
}));

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const TableGrafik = props => {
	var no = 1;
	const { data } = props;

	const classes = useStyles();

	return(
    	<Paper className={classes.root}>
    		<Table className={classes.table}>
    			<TableHead>
		          <TableRow>
		            <TableCell align="left">NO</TableCell>
		            <TableCell align="left">NOPEND</TableCell>
		            <TableCell align="left">KANTOR</TableCell>
		            <TableCell align="right">TOTAL</TableCell>
		          </TableRow>
		        </TableHead>
	          <TableBody>
		          {data.map((row) => (
		            <TableRow key={row.deskripsi}>
		              <TableCell component="th" scope="row">
		                {no++}
		              </TableCell>
		              <TableCell align="left">{row.nopendsr}</TableCell>
		              <TableCell align="left">{row.NamaKtr}</TableCell>
		              <TableCell align="right">{numberWithCommas(row.total)}</TableCell>
		            </TableRow>
		          ))}
		       </TableBody>
    		</Table>
    	</Paper>
	);
}

TableGrafik.propTypes = {
  data: PropTypes.array.isRequired
}

export default TableGrafik;