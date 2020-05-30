import React from "react";
import { 
	Grid, 
	Fab
} from '@material-ui/core';
import { DatePicker } from "@material-ui/pickers";
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from "prop-types";

const FormSearch = props => {
	const [selectedDate, handleDateChange] = React.useState(new Date());

	return(
		<React.Fragment>
			<Grid item lg={3} md={3} xl={3} xs={3}>
				<DatePicker
			        disableFuture
			        openTo="year"
			        label="Periode"
					views={["year", "month"]}
			        value={selectedDate}
			        onChange={(e) => handleDateChange(e._d)}
			    />
			</Grid>
			<Grid item lg={3} md={3} xl={3} xs={3}>
				<Fab color="primary" aria-label="Add" size="small" onClick={() => props.onSubmit(selectedDate)}>
			        <SearchIcon />
			    </Fab>
			</Grid>
		</React.Fragment>
	);
}

FormSearch.propTypes = {
	onSubmit: PropTypes.func.isRequired
}

export default FormSearch;