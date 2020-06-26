import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	Paper,
	Table, 
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Typography
} from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	    overflowX: 'auto',
	    height: '530px'
	},
	content: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '90%',
		display: 'flex'
	},
	label: {
    	textTransform: 'capitalize'
	},
	row: {
	  	whiteSpace: 'nowrap',
	  	fontSize: '11px',
	  	lineHeight: '0.3125rem'
	},
	head: {
	  	whiteSpace: 'nowrap'
	}
}));

const TablePks = props => {
	const classes = useStyles();
	const { data } = props;

	const content 	= [];

	let groupByArea = '';
	var no = 1;
	if (data.length > 0) {
		for(var i = 0; i < data.length; i++){
			let item 	= data[i];
			let area 	= item.idwilayah;
			if (groupByArea !== area) {
				no = 1;
				groupByArea = area;
				content.push(
					<React.Fragment key={i}>
						<TableRow selected>
							<TableCell colSpan='10' align="left" className={classes.row}>AREA {area}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row" className={classes.row}>{no++}</TableCell>
				            <TableCell className={classes.row} align="left">{item.nopend}</TableCell>
				            <TableCell className={classes.row} align="left">{item.NamaKtr}</TableCell>
				            <TableCell className={classes.row} align="left">{item.idregpelanggan}</TableCell>
				            <TableCell className={classes.row} align="left">{item.nm_perusahaan}</TableCell>
				            <TableCell className={classes.row} align="left">{item.Bidang_Usaha}</TableCell>
				            <TableCell className={classes.row} align="left">{item.no_pks}</TableCell>
				            <TableCell className={classes.row} align="left">{item.awal_pks}</TableCell>
				            <TableCell className={classes.row} align="left">{item.akhir_pks}</TableCell>
				            <TableCell className={classes.row} align="left">{item.ae}</TableCell>
						</TableRow>
					</React.Fragment>
				);
			}else{
				content.push(
					<TableRow key={i}>
						<TableCell component="th" scope="row" className={classes.row}>{no++}</TableCell>
			            <TableCell className={classes.row} align="left">{item.nopend}</TableCell>
			            <TableCell className={classes.row} align="left">{item.NamaKtr}</TableCell>
			            <TableCell className={classes.row} align="left">{item.idregpelanggan}</TableCell>
			            <TableCell className={classes.row} align="left">{item.nm_perusahaan}</TableCell>
			            <TableCell className={classes.row} align="left">{item.Bidang_Usaha}</TableCell>
			            <TableCell className={classes.row} align="left">{item.no_pks}</TableCell>
			            <TableCell className={classes.row} align="left">{item.awal_pks}</TableCell>
			            <TableCell className={classes.row} align="left">{item.akhir_pks}</TableCell>
			            <TableCell className={classes.row} align="left">{item.ae}</TableCell>
					</TableRow>
				);
			}
		}
	}
	return(
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
		          <TableRow>
		            <TableCell align="left" className={classes.head}>NO</TableCell>
					<TableCell align="left" className={classes.head}>NOPEND</TableCell>
					<TableCell align="left" className={classes.head}>KANTOR</TableCell>
					<TableCell align="left" className={classes.head}>ID PELANGGAN</TableCell>
					<TableCell align="left" className={classes.head}>NAMA PELANGGAN</TableCell>
					<TableCell align="left" className={classes.head}>SEGMENT</TableCell>
					<TableCell align="left" className={classes.head}>NO PKS</TableCell>
					<TableCell align="left" className={classes.head}>TGL MULAI</TableCell>
					<TableCell align="left" className={classes.head}>TGL AKHIR</TableCell>
					<TableCell align="left" className={classes.head}>AE</TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		        	{ content }
		        </TableBody>
			</Table>
			{ data.length === 0 && <div className={classes.content}>
				<Typography className={classes.label} variant="body2">
			        KLIK TOMBOL TAMPILKAN UNTUK MENAMPILKAN DATA PKS
			    </Typography>
			</div>}
		</Paper>
	);
}

TablePks.propTypes = {
	data: PropTypes.array.isRequired
}

export default TablePks;