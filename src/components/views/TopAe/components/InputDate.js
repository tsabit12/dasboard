import React from "react";
import { DatePicker } from "@material-ui/pickers";
import { makeStyles } from '@material-ui/styles'; 
import { Button } from '@material-ui/core';
import { convertDay } from "../../../../utils";
import PropTypes from "prop-types";

const useStyles = makeStyles(them => ({
  input: {
  	paddingLeft: '10px'
  },
  root: {
  	display: 'inline-box'
  },
  button: {
  	marginTop: '8px',
  	marginLeft: '10px'
  }
}));


const InputDate = props => {
	const [selectedDate, handleDateChange] = React.useState({
		start: new Date(),
		end: new Date()
	});

	const onChangeDate = (value, name) => {
		handleDateChange(prevState => ({
			...prevState,
			[name]: value._d
		}))
	}

	const onSubmit = () => {
		const valueStart 	= convertDay(selectedDate.start);
		const valueEnd 		= convertDay(selectedDate.end);
		const payload = {
			startDate: valueStart,
			endDate: valueEnd
		}	 
		props.submit(payload);
	}

	const classes = useStyles();

	return(
		<div className={classes.root}>
			<div className={classes.input}>
				<DatePicker
			        disableFuture
			        // openTo="year"
			        format="DD/MM/YYYY"
			        label="Tanggal Mulai"
			        views={["year", "month", "date"]}
			        value={selectedDate.start}
			        onChange={(e) => onChangeDate(e, 'start')}
			    />
		    </div>
		    <div className={classes.input}>
			    <DatePicker
			        disableFuture
			        // openTo="year"
			        format="DD/MM/YYYY"
			        label="Sampai"
			        views={["year", "month", "date"]}
			        value={selectedDate.end}
			        onChange={(e) => onChangeDate(e, 'end')}
			    />
		    </div>
		    <Button 
		    	variant="contained" 
		    	color="secondary" 
		    	className={classes.button} 
		    	onClick={onSubmit}
		    >Cari</Button>
	    </div>
	);
}

InputDate.propTypes = {
	submit: PropTypes.func.isRequired
}

export default InputDate;