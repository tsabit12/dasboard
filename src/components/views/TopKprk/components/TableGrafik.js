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
    height: '100%'
  },
  table: {
    minWidth: 650,
  },
  smallFont: {
  	fontSize: '12px',
  	whiteSpace: 'nowrap',
  	borderWidth: 1,
  	borderColor: 'rgb(128, 128, 128)',
  	borderStyle: 'solid',
  	lineHeight: '0.3125rem'
  }
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
	                  <TableCell rowSpan={2} className={classes.smallFont}>NO</TableCell>
	                  <TableCell rowSpan={2} className={classes.smallFont}>NOPEND</TableCell>
	                  <TableCell rowSpan={2} className={classes.smallFont}>KANTOR</TableCell>
	                  <TableCell colSpan={7} align="center" className={classes.smallFont}>
	                    REALISASI
	                  </TableCell>
	                  <TableCell colSpan={7} align="center" className={classes.smallFont}>
	                    TARGET
	                  </TableCell>
	                  <TableCell align="center" className={classes.smallFont}>
	                    PERSENTASE
	                  </TableCell>
	                </TableRow>
	                <TableRow>
	                  <TableCell align="center" className={classes.smallFont}>SURAT DN</TableCell>
	                  <TableCell align="center" className={classes.smallFont}>PAKET DN</TableCell>
	                  <TableCell align="center" className={classes.smallFont}>SURAT LN</TableCell>
	                  <TableCell align="center" className={classes.smallFont}>PAKET LN</TableCell>
	                  <TableCell align="center" className={classes.smallFont}>LOG DN</TableCell>
	                  <TableCell align="center" className={classes.smallFont}>LOG LN</TableCell>
	                  <TableCell align="center" className={classes.smallFont}>JUMLAH</TableCell>

	                  <TableCell align="center" className={classes.smallFont}>SURAT DN</TableCell>
	                  <TableCell align="center" className={classes.smallFont}>PAKET DN</TableCell>
	                  <TableCell align="center" className={classes.smallFont}>SURAT LN</TableCell>
	                  <TableCell align="center" className={classes.smallFont}>PAKET LN</TableCell>
	                  <TableCell align="center" className={classes.smallFont}>LOG DN</TableCell>
	                  <TableCell align="center" className={classes.smallFont}>LOG LN</TableCell>
	                  <TableCell align="center" className={classes.smallFont}>JUMLAH</TableCell>

	                  <TableCell align="center" className={classes.smallFont}>%</TableCell>
	                </TableRow>
	            </TableHead>
	          <TableBody>
		          {data.map((row, i) => (
		            <TableRow key={i}>
		              <TableCell component="th" scope="row" className={classes.smallFont}>
		                {no++}
		              </TableCell>
		              <TableCell align="left" className={classes.smallFont}>{row.nopendsr}</TableCell>
		              <TableCell align="left" className={classes.smallFont}>{row.NamaKtr}</TableCell>
		              <TableCell align="right" className={classes.smallFont}>{numberWithCommas(row.srtdn)}</TableCell>
		              <TableCell align="right" className={classes.smallFont}>{numberWithCommas(row.ppdn)}</TableCell>
		              <TableCell align="right" className={classes.smallFont}>{numberWithCommas(row.srtln)}</TableCell>
		              <TableCell align="right" className={classes.smallFont}>{numberWithCommas(row.ppln)}</TableCell>
		              <TableCell align="right" className={classes.smallFont}>{numberWithCommas(row.log1_re)}</TableCell>
		              <TableCell align="right" className={classes.smallFont}>{numberWithCommas(row.log2_re)}</TableCell>
		              <TableCell align="right" className={classes.smallFont}>{numberWithCommas(row.total)}</TableCell>

		              <TableCell align="right" className={classes.smallFont}>{numberWithCommas(row.tsrtdn)}</TableCell>
		              <TableCell align="right" className={classes.smallFont}>{numberWithCommas(row.tppdn)}</TableCell>
		              <TableCell align="right" className={classes.smallFont}>{numberWithCommas(row.tsrtln)}</TableCell>
		              <TableCell align="right" className={classes.smallFont}>{numberWithCommas(row.tppln)}</TableCell>
		              <TableCell align="right" className={classes.smallFont}>{numberWithCommas(row.log1_ta)}</TableCell>
		              <TableCell align="right" className={classes.smallFont}>{numberWithCommas(row.log2_ta)}</TableCell>
		              <TableCell align="right" className={classes.smallFont}>{numberWithCommas(row.total2)}</TableCell>

		              <TableCell align="center" className={classes.smallFont}>{row.total_persen}</TableCell>
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