import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/styles';
import { 
	Breadcrumbs, 
	Typography, 
	Backdrop,
	CircularProgress
} from '@material-ui/core';
import { connect } from "react-redux";
import { getTopKrpk } from "../../../actions/grafik";
import { Grafik } from "./components";
import AssessmentIcon from '@material-ui/icons/Assessment';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { convertDay } from "../../../utils";

const useStyles = makeStyles(theme => ({
	root: {
	    padding: theme.spacing(4)
	},
	link: {
	    display: 'flex',
	},
	icon: {
	    marginRight: theme.spacing(0.5),
	    width: 20,
	    height: 20,
	},
	paper: {
		padding: '15px',
		marginBottom: '10px',
		marginTop: '10px'
	},
	loadingBackdrop: {
	    zIndex: theme.zIndex.drawer + 1,
	    color: '#fff',
	},
	progress: {
	    zIndex: theme.zIndex.drawer + 2,
	    position: 'absolute',
	    margin: '0 0 0 0',
	    left: '50%',
	    top: '50%',
	    color: 'white'
	},
	row: {
		display: 'flex',
		alignItems: 'center'
	},
	field: {
		paddingRight: 15
	}
}))

const TopKprk = props => {
	const [state, setState] = React.useState({
		data: {
			start: new Date(),
			end: new Date()
		},
		loading: false,
		errors: {}
	});

	React.useEffect(() => {
		if (Object.keys(props.searchParam).length > 0 ) {
			const { start, end } = props.searchParam;
			setState(prevState => ({
				...prevState,
				data: {
					start: start,
					end: end
				}
			}))
		}
	}, [props.searchParam])

	const handleDateChange = (value, name) => setState(prevState => ({
		...prevState,
		data: {
			...prevState.data,
			[name]: value
		}
	}))

	const onSearch = () => {
		const { start, end } = state.data;
		const payload = {
			start: convertDay(start),
			end: convertDay(end)
		};
		const param = {
			start,
			end
		};
		
		setState(prevState => ({
			...prevState,
			loading: true,
			errors: {}
		}))

		props.getTopKrpk(payload, param)
			.then(() => 
				setState(prevState => ({
					...prevState,
					loading: false
				})
			))
			.catch(err => {
				if (err.response) {
					setState(prevState => ({
						...prevState,
						loading: false,
						errors: {
							global: 'Data tidak ditemukan'
						}
					}))
				}else{
					setState(prevState => ({
						...prevState,
						loading: false,
						errors: {
							global: 'Terdapat kesalahan, silahkan cobalagi'
						}
					}))
				}
			})
	}

	const classes = useStyles();
	const { grafik, searchParam } = props;
	const { loading } = state;

	return(
		<div className={classes.root}>
			<Backdrop className={classes.loadingBackdrop} open={loading} />
			{ loading && <CircularProgress className={classes.progress} /> }
			<Breadcrumbs aria-label="Breadcrumb">
		        <div className={classes.link}>
			        <AssessmentIcon className={classes.icon} />
			        TOP BISNIS KORPORAT
		        </div>
		        <Typography color="textPrimary" className={classes.link}>
		          <WhatshotIcon className={classes.icon} />
		          TOP 10 KANTOR POS
		        </Typography>
		    </Breadcrumbs>
		    <div style={{marginTop: 10}}>
				<Grafik 
					data={grafik} 
					param={searchParam} 
					value={state.data}
					handleChange={handleDateChange}
					onSubmit={onSearch}
				/>			    
		    </div>
		</div>
	);
}

TopKprk.propTypes = {
	grafik: PropTypes.array.isRequired,
	getTopKrpk: PropTypes.func.isRequired,
	searchParam: PropTypes.object.isRequired
}

function mapStateToProp(state) {
	return{
		grafik: state.grafik.topKprk,
		searchParam: state.grafik.searchKprk
	}
}

export default connect(mapStateToProp, { getTopKrpk })(TopKprk);