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
    overflowX: 'auto',
  },
  row: {
  	whiteSpace: 'nowrap',
  	fontSize: '12px'
  },
  header: {
  	fontSize: '15px'
  }
}));


const TablePks = props => {
	const { data, errors } = props;
	const classes = useStyles();
	const contentTbody = [];
	let groupByArea = '';
	var no = 1;
	if (data.length > 0) {
		for(var i = 0; i < data.length; i++){
			let item 	= data[i];
			let area 	= item.idwilayah;
			if (groupByArea !== area) {
				no = 1;
				groupByArea = area;
				contentTbody.push(
					<React.Fragment key={i}>
						<TableRow selected>
							<TableCell colSpan='9' align="left">AREA {area}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row">{no++}</TableCell>
				            <TableCell className={classes.row} align="left">{item.nopend}</TableCell>
				            <TableCell className={classes.row} align="left">{item.NamaKtr}</TableCell>
				            <TableCell className={classes.row} align="left">{item.idregpelanggan}</TableCell>
				            <TableCell className={classes.row} align="left">{item.nm_perusahaan}</TableCell>
				            <TableCell className={classes.row} align="left">{item.Bidang_Usaha}</TableCell>
				            <TableCell className={classes.row} align="left">{item.no_pks}</TableCell>
				            <TableCell className={classes.row} align="left">{item.awal_pks}</TableCell>
				            <TableCell className={classes.row} align="left">{item.akhir_pks}</TableCell>
						</TableRow>
					</React.Fragment>
				);
			}else{
				contentTbody.push(
					<TableRow key={i}>
						<TableCell component="th" scope="row">{no++}</TableCell>
			            <TableCell className={classes.row} align="left">{item.nopend}</TableCell>
			            <TableCell className={classes.row} align="left">{item.NamaKtr}</TableCell>
			            <TableCell className={classes.row} align="left">{item.idregpelanggan}</TableCell>
			            <TableCell className={classes.row} align="left">{item.nm_perusahaan}</TableCell>
			            <TableCell className={classes.row} align="left">{item.Bidang_Usaha}</TableCell>
			            <TableCell className={classes.row} align="left">{item.no_pks}</TableCell>
			            <TableCell className={classes.row} align="left">{item.awal_pks}</TableCell>
			            <TableCell className={classes.row} align="left">{item.akhir_pks}</TableCell>
					</TableRow>
				);
			}
		}
	}

	return(
		<div>
			{ errors.global ? <Paper className={classes.root} style={{backgroundColor: 'red'}}>
				 <p style={{padding: '10px', color: 'white'}}>{errors.global}</p>
			</Paper> : <React.Fragment>
				{ data.length > 0 ? <Paper className={classes.root}>
					<Table size="small">
						<TableHead>
							<TableRow className={classes.row}>
								<TableCell align="left" className={classes.header}>NO</TableCell>
								<TableCell align="left" className={classes.header}>NOPEND</TableCell>
								<TableCell align="left" className={classes.header}>KANTOR</TableCell>
								<TableCell align="left" className={classes.header}>ID PELANGGAN</TableCell>
								<TableCell align="left" className={classes.header}>NAMA PELANGGAN</TableCell>
								<TableCell align="left" className={classes.header}>SEGMENT</TableCell>
								<TableCell align="left" className={classes.header}>NO PKS</TableCell>
								<TableCell align="left" className={classes.header}>TGL MULAI</TableCell>
								<TableCell align="left" className={classes.header}>TGL AKHIR</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{ contentTbody }
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