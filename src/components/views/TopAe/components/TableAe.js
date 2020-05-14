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
    overflowX: 'auto',
    height: '600px',
    marginTop: '10px'
  },
  table: {
    minWidth: 650,
  },
}));

const TableAe = props => {
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
			</Table>
		</Paper>
	);
}

export default TableAe;