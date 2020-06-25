import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	Paper,
	TableBody,
	Table,
	TableCell,
	TableHead,
	TableRow
} from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '550px',
    	overflowY: 'auto'
	},
	table: {
	    minWidth: 650,
	}
}))

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const TableList = props => {
	var  no = 1;
	const classes = useStyles();
	const { list } = props;

	return(
		<Paper className={classes.root}>
			<Table>
				<TableHead>
		          <TableRow>
		            <TableCell align="left">NO</TableCell>
		            <TableCell align="left">WILAYAH</TableCell>
		            <TableCell align="left">KANTOR</TableCell>
		            <TableCell align="left">NIPPOS</TableCell>
		            <TableCell align="left">NAMA</TableCell>
		            <TableCell align="right">PENDAPATAN</TableCell>
		            <TableCell align="right">PRODUKSI</TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		        	{ list.length === 0 ? <TableRow> 
		        		<TableCell component="th" style={{borderWidth: 0}} align="center" scope="row" colSpan={7}>
		        			Data kosong, silahkan klik tombol tampilkan untuk menampilkan data top 100 AE
		        		</TableCell>
		        	</TableRow> : <React.Fragment>
		        		{list.map((row) => (
				            <TableRow key={row.id_petugas}>
				              <TableCell component="th" scope="row">
				                {no++}
				              </TableCell>
				              <TableCell align="left">{row.idwilayah}</TableCell>
				              <TableCell align="left">{row.kantor}</TableCell>
				              <TableCell align="left">{row.id_petugas}</TableCell>
				              <TableCell align="left">{row.nama}</TableCell>
				              <TableCell align="right">{numberWithCommas(Math.round(row.total))}</TableCell>
				              <TableCell align="right">{numberWithCommas(row.prod)}</TableCell>
				            </TableRow>
				       	))}
		        	</React.Fragment>}
		        </TableBody>
			</Table>
		</Paper>
	);
}

TableList.propTypes = {
	list: PropTypes.array.isRequired
}

export default TableList;