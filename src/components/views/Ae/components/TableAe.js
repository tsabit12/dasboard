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

const useStyles = makeStyles(theme => ({
  root: {
  	width: '100%',
  	marginTop: '10px'
  },
  table: {
    minWidth: 650,
  },
}));

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const TableAe = props => {
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
		        	{ props.list[props.offset] ?  <React.Fragment>
		        		{ props.list[props.offset].map(row => <TableRow key={row.RowNum}>
		        			<TableCell component="th" scope="row">{row.RowNum}</TableCell>
		        			<TableCell align="left">{row.nama}</TableCell>
				            <TableCell align="left">{row.kantor}</TableCell>
				            <TableCell align="right">{numberWithCommas(Math.round(row.total))}</TableCell>
		        		</TableRow>)}
		        	</React.Fragment> : <TableRow> 
			        		<TableCell component="th" scope="row" colSpan={4}>
			        			Loading....
			        		</TableCell> 
		        		</TableRow> }
		        </TableBody>
		    </Table>
		</Paper>
	);
}

export default TableAe;