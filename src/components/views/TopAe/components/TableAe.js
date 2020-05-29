import React from "react";
import { makeStyles } from '@material-ui/styles'; 
import {
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
  	width: '100%'
  },
  table: {
    minWidth: 650,
  },
}));

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const TableAe = props => {
	const { list } 	= props;
	var no 			= 1;
	const classes 	= useStyles();
	return(
		<Paper className={classes.root}>
			<Table>
				<TableHead>
		          <TableRow>
		            <TableCell align="left">NO</TableCell>
		            <TableCell align="left">NAMA</TableCell>
		            <TableCell align="left">KANTOR</TableCell>
		            <TableCell align="right">TOTAL</TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		        	{ list.length === 0 ? <TableRow> 
		        		<TableCell component="th" scope="row" colSpan={4}>
		        			Loading....
		        		</TableCell>
		        	</TableRow> : <React.Fragment>
		        		{list.map((row) => (
				            <TableRow key={row.id_petugas}>
				              <TableCell component="th" scope="row">
				                {no++}
				              </TableCell>
				              <TableCell align="left">{row.nama}</TableCell>
				              <TableCell align="left">{row.kantor}</TableCell>
				              <TableCell align="right">{numberWithCommas(Math.round(row.total))}</TableCell>
				            </TableRow>
				       	))}
		        	</React.Fragment>}
		        </TableBody>
			</Table>
		</Paper>
	);
}

TableAe.propTypes = {
	list: PropTypes.array.isRequired
}

export default TableAe;