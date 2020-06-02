import React from "react";
import { DatePicker } from "@material-ui/pickers";
import PropTypes from "prop-types";

const InputDate = props => {
	const [selectedDate, handleDateChange] = React.useState(new Date());
 
	const onSubmit = (date) => {
		handleDateChange(date);
		setTimeout(() => {
			props.submit(date);
		}, 10)
	}

	return(
		<DatePicker
	        disableFuture
	        openTo="year"
			views={["year", "month"]}
	        value={selectedDate}
	        onChange={(e) => onSubmit(e._d)}
	    />
	);
}

InputDate.propTypes = {
	submit: PropTypes.func.isRequired
}

export default InputDate;