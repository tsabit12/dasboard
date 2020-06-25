import React from "react";
import { makeStyles } from "@material-ui/styles";
import { DatePicker } from "@material-ui/pickers";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	field: {
		marginRight: 10
	},
	button: {
		marginTop: 11
	}
}));

const Search = props => {
	const classes = useStyles();
	const { value } = props;

	return(
		<div className={classes.root}>
			<div className={classes.field}>
				<DatePicker
			        format="DD/MM/YYYY"
			        views={["year", "month", "date"]}
			        label="Mulai"
			        value={value.start}
			        onChange={(e) => props.onChange(e._d, 'start')}
			    />
			</div>
			<div className={classes.field}>
				<DatePicker
			        format="DD/MM/YYYY"
			        views={["year", "month", "date"]}
			        label="Sampai"
			        value={value.end}
			        onChange={(e) => props.onChange(e._d, 'end')}
			    />
			</div>
			<Button 
		    	variant="contained" 
		    	color="primary" 
		    	className={classes.button}
		    	onClick={props.onSubmit}
		    >
		    	Tampilkan
		    </Button>
		</div>
	);
}

Search.propTypes = {
	value: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
}

export default Search;