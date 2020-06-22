import React from "react";
import { Fab } from '@material-ui/core';
import { DatePicker } from "@material-ui/pickers";
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		margin: 10,
		alignItems: 'center'
	},
	field: {
		paddingRight: 15
	}
}));

const FormSearch = props => {
	const classes = useStyles();
	// const [state, setState] = React.useState({
	// 	start: new Date(),
	// 	end: new Date()
	// });

	// const handleDateChange = (e, name) => setState(prevState => ({
	// 	...prevState,
	// 	[name]: e
	// }))

	const { payload } = props;

	return(
		<div className={classes.root}>
			<div className={classes.field}>	
				<DatePicker
			        // disableFuture
			        format="DD/MM/YYYY"
			        label="Tanggal Mulai"
					views={["year", "month", "date"]}
			        value={payload.start}
			        onChange={(e) => props.onChange(e._d, 'start')}
			    />
			</div>
			<div className={classes.field}>
			    <DatePicker
			        // disableFuture
			        format="DD/MM/YYYY"
			        label="Sampai"
					views={["year", "month", "date"]}
			        value={payload.end}
			        onChange={(e) => props.onChange(e._d, 'end')}
			    />
			</div>
				<Fab color="primary" aria-label="Add" size="small" onClick={() => props.onSubmit()}>
			        <SearchIcon />
			    </Fab>
		</div>
	);
}

FormSearch.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	payload: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired
}

export default FormSearch;