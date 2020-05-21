import React from "react";
import { makeStyles } from '@material-ui/styles'; 
import {  
	Paper,
	Table,
	TableRow,
	TableHead,
	TableCell,
	TableBody 
} from '@material-ui/core';
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
	marginTop: theme.spacing(1),
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  rootTable: {
  	marginTop: theme.spacing(1),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
    maxHeight: '555px'
  },
  row: {
  	whiteSpace: 'nowrap',
  	fontSize: '12px'
  }
}));


const TablePks = props => {
	const { data, errors } = props;
	var no = 1;
	const classes = useStyles();
	
	return(
		<div>
			{ errors.global ? <Paper className={classes.root} style={{backgroundColor: 'red'}}>
				 <p style={{padding: '10px', color: 'white'}}>{errors.global}</p>
			</Paper> : <React.Fragment>
				{ data.length > 0 ? <Paper className={classes.rootTable}>
					<Table size="small">
						<TableHead>
							<TableRow className={classes.row}>
								<TableCell align="left">NO</TableCell>
								<TableCell align="left">NOPEND</TableCell>
								<TableCell align="left">KANTOR</TableCell>
								<TableCell align="left">ID PELANGGAN</TableCell>
								<TableCell align="left">NAMA PELANGGAN</TableCell>
								<TableCell align="left">SEGMENT</TableCell>
								<TableCell align="left">NO PKS</TableCell>
								<TableCell align="left">TGL MULAI</TableCell>
								<TableCell align="left">TGL AKHIR</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((row, index) => (
								<TableRow key={index} className={classes.row}>
									<TableCell component="th" scope="row">
						                {no++}
						            </TableCell>
						            <TableCell className={classes.row} align="left">{row.nopend}</TableCell>
						            <TableCell className={classes.row} align="left">{row.NamaKtr}</TableCell>
						            <TableCell className={classes.row} align="left">{row.idregpelanggan}</TableCell>
						            <TableCell className={classes.row} align="left">{row.nm_perusahaan}</TableCell>
						            <TableCell className={classes.row} align="left">{row.Bidang_Usaha}</TableCell>
						            <TableCell className={classes.row} align="left">{row.no_pks}</TableCell>
						            <TableCell className={classes.row} align="left">{row.awal_pks}</TableCell>
						            <TableCell className={classes.row} align="left">{row.akhir_pks}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Paper>: <Paper className={classes.root}>
					 <p style={{padding: '10px'}}>Untuk menampilkan data pks, silahkan klik tombol tampilkan diatas</p>
				</Paper>}
			</React.Fragment> }
		</div>
	);
}

TablePks.propTypes = {
	data: PropTypes.array.isRequired
}

export default TablePks;