import React from "react";
import { 
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button
} from "@material-ui/core";
import PropTypes from "prop-types";
import { DatePicker } from "@material-ui/pickers";
import { makeStyles } from '@material-ui/styles'; 


const useStyles = makeStyles(theme => ({
  	formControl: {
	    minWidth: 200
	},
	label: {
		fontSize: '10px'
	},
	button: {
		marginTop: '12px',
		marginLeft: '10px'
	}
}));

const OptionsAll = props => (
	<Select
      value={props.value}
      inputProps={{
        name: 'reg',
        id: 'reg-id',
      }}
    >
    	<MenuItem value='00'>LOADING...</MenuItem>
    </Select>	
); 

const SearchParam = props => {
	const classes = useStyles();
	const { area, getKprk, listKprk } = props;

	const [formState, setState] = React.useState({
		start: new Date(),
		end: new Date(),
		reg: '00',
		kprk: '00'
	});

	React.useEffect(() => {
		
		if (formState.reg !== '00') {
			getKprk(formState.reg);
		}

	}, [ formState.reg, getKprk ])


	const onChangeDate = (value, name) => {
		setState(prevState => ({
			...prevState,
			[name]: value._d
		}))
	}

	const onChangeValue = (e) => {
		const { name } = e.target;
		if (name === 'reg') {
			setState(prevState => ({
				...prevState,
				reg: e.target.value,
				kprk: '00'
			}))
		}else{
			setState(prevState => ({
				...prevState,
				[name]: e.target.value
			}))
		}
	}


	return(
		<React.Fragment>
			<Grid item lg={12} md={12} xl={12} xs={12}>
			    <FormControl className={classes.formControl}>
			    	<InputLabel htmlFor="reg-id">AREA PENJUALAN</InputLabel>
			    	{ area.length > 0 ? 
			    		<Select 
			    			value={formState.reg}
			    			inputProps={{
							    name: 'reg',
							    id: 'reg-id',
							}}
							onChange={onChangeValue}
			    		>
			    			<MenuItem value='00'>SEMUA AREA</MenuItem>
			    			{ props.area.map((list, index) => <MenuItem value={list.IDWILAYAH}  key={index}>
				    			{list.NAMAKTR}
				    		</MenuItem> )}
			    		</Select> : <OptionsAll value={formState.reg}/> }
			    </FormControl>
			    <FormControl className={classes.formControl} style={{marginLeft: '10px'}}>
			    	<InputLabel htmlFor="kprk-id">KPRK</InputLabel>
		    		<Select
		    			value={formState.kprk}
		    			inputProps={{
						    name: 'kprk',
						    id: 'kprk-id',
						}}
						onChange={onChangeValue}
		    		>
		    			<MenuItem value='00'>SEMUA KPRK</MenuItem>
		    			{ listKprk.map((row, index) => <MenuItem value={row.NOPENDSR} key={index}>
				    		{row.NOPENDSR} - {row.NAMAKTR}
				    	</MenuItem> )}
		    		</Select>
			    </FormControl>
				<DatePicker
			        disableFuture
			        format="YYYY-MM-DD"
			        label="TANGGAL MULAI"
			        views={["year", "month", "date"]}
			        value={formState.start}
			        style={{marginLeft: '10px'}}
			        onChange={(e) => onChangeDate(e, 'start')}
			    />
				<DatePicker
			        disableFuture
			        format="YYYY-MM-DD"
			        label="SAMPAI"
			        views={["year", "month", "date"]}
			        value={formState.end}
			        style={{marginLeft: '10px'}}
			        onChange={(e) => onChangeDate(e, 'end')}
			    />
			    <Button 
			    	color="primary" 
			    	variant="contained" 
			    	className={classes.button}
			    	onClick={() => props.onSubmit(formState)}
			    >TAMPILKAN</Button>
			</Grid>
		</React.Fragment>
	);
}

SearchParam.propTypes = {
	area: PropTypes.array.isRequired,
	getKprk: PropTypes.func.isRequired,
	listKprk: PropTypes.array.isRequired,
	onSubmit: PropTypes.func.isRequired
}

export default SearchParam;