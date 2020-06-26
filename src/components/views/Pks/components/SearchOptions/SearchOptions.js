import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	InputLabel,
	Select,
	MenuItem,
	FormControl,
	FormHelperText,
	Button
} from "@material-ui/core";
import PropTypes from "prop-types";
import { DatePicker } from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
	root:{
		display: 'flex',
    	flexWrap: 'wrap',
		alignItems: 'center'
	},
	formControl: {
		marginRight: theme.spacing(1),
    	width: 170,
	},
	button: {
		marginTop: 11
	}
}))

const SearchOptions = props => {
	const classes = useStyles();
	const { value, listReg, listKprk } = props;

	const RenderSelectReg = () => {
		if (listReg.length > 0) {
			return(
				<Select
		          value={value.reg}
		          onChange={props.handleChangeReg}
		          inputProps={{
		            name: 'reg',
		            id: 'reg-id',
		          }}
		        >
		        	<MenuItem value='00'>SEMUA AREA</MenuItem>
		        	{listReg.map((row, index) => <MenuItem
	                    key={index}
	                    value={row.IDWILAYAH}>
	                    {row.NAMAKTR}
	                </MenuItem> )}
		        </Select>
			);
		}else{
			return(
				<Select
		          value={value.reg}
		          inputProps={{
		            name: 'reg',
		            id: 'reg-id',
		          }}
		        >
		        	<MenuItem value='00'>SEMUA AREA</MenuItem>
		        </Select>
			);
		}
	}

	const RenderSelectKprk = () => {
		if (listKprk.length > 0) {
			return(
				<Select
		          value={value.kprk}
		          onChange={props.onChange}
		          inputProps={{
		            name: 'kprk',
		            id: 'kprk-id',
		          }}
		        >
		        	<MenuItem value='00'>SEMUA KPRK</MenuItem>
		        	{listKprk.map((row, index) => <MenuItem
	                    key={index}
	                    value={row.NOPENDSR}>
	                    {row.NOPENDSR} - {row.NAMAKTR}
	                </MenuItem> )}
		        </Select>
			);
		}else{
			return(
				<Select
		          value={value.kprk}
		          inputProps={{
		            name: 'kprk',
		            id: 'kprk-id',
		          }}
		        >
		        	<MenuItem value='00'>SEMUA KPRK</MenuItem>
		        </Select>
		    );
		}
	}

	return(
		<div className={classes.root}>
			<FormControl className={classes.formControl}>
				<InputLabel htmlFor="reg-id">AREA PENJUALAN</InputLabel>
				{RenderSelectReg()}
			</FormControl>
			<FormControl className={classes.formControl}>
				<InputLabel htmlFor="kprk-id">KPRK</InputLabel>
				{RenderSelectKprk()}
			</FormControl>
			<FormControl className={classes.formControl} error={!!props.errors.jenis}>
				<InputLabel htmlFor="jenis-id">JENIS</InputLabel>
				<Select
		          value={value.jenis}
		          onChange={props.onChange}
		          inputProps={{
		            name: 'jenis',
		            id: 'jenis-id',
		          }}
		        >
		        	<MenuItem value='11'>PILIH JENIS</MenuItem>
			    	<MenuItem value='01'>BARU</MenuItem>
			    	<MenuItem value='02'>EXISTING</MenuItem>
			    	<MenuItem value='03'>EXPIRED</MenuItem>
		        </Select>
		        { props.errors.jenis && <FormHelperText>{props.errors.jenis}</FormHelperText> }
			</FormControl>
			<FormControl className={classes.formControl}>
				<DatePicker
			        format="DD/MM/YYYY"
			        views={["year", "month", "date"]}
			        label="MULAI"
			        value={value.start}
			        onChange={(e) => props.onChangeDate(e._d, 'start')}
			    />
			</FormControl>
			<FormControl className={classes.formControl}>
				<DatePicker
			        format="DD/MM/YYYY"
			        views={["year", "month", "date"]}
			        label="SAMPAI"
			        value={value.end}
			        onChange={(e) => props.onChangeDate(e._d, 'end')}
			    />
			</FormControl>
			<Button variant="contained" color="primary" className={classes.button} onClick={props.onSubmit}>
				Tampilkan
			</Button>
		</div>
	);
}

SearchOptions.propTypes = {
	value: PropTypes.object.isRequired,
	listReg: PropTypes.array.isRequired,
	handleChangeReg: PropTypes.func.isRequired,
	listKprk: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	onChangeDate: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
}

export default SearchOptions;