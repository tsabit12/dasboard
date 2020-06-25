import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	Grid,
	Breadcrumbs,
	Typography,
	Divider
} from "@material-ui/core";
import AssessmentIcon from '@material-ui/icons/Assessment';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import {
	Search,
	Table
} from "./components";
import LoaderBackdrop from "../LoaderBackdrop";
import MessageInfo from "../MessageInfo";
import { connect } from "react-redux";
import { getTopAe } from "../../../actions/ae";
import { convertDay } from "../../../utils";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	},
	title: {
		alignSelf: 'flex-end'
	},
	icon: {
	    marginRight: theme.spacing(0.5),
	    width: 20,
	    height: 20,
	},
	link: {
	    display: 'flex',
	}
}))

const Title = () => {
	const classes = useStyles();
	return(
		<Breadcrumbs aria-label="Breadcrumb">
			<div className={classes.link}>
				<AssessmentIcon className={classes.icon} />
				TOP BISNIS KORPORAT
			</div>
			<Typography color="textPrimary" className={classes.link}>
				<WhatshotIcon className={classes.icon} />
				TOP 100 AE
			</Typography>
		</Breadcrumbs>
	)
}


const TopAe = props => {
	const [state, setState] = React.useState({
		data: {
			start: new Date(),
			end: new Date()
		},
		loading: false,
		errors: {}
	})

	React.useEffect(() => {
		if (Object.keys(props.title).length > 0) {
			setState(prevState => ({
				...prevState,
				data: {
					start: props.title.start,
					end: props.title.end
				}
			}))
		}
	}, [props.title])
	
	const classes = useStyles();
	const handleChange = (value, name) => {
		setState(prevState => ({
			...prevState,
			data: {
				...prevState.data,
				[name]: value
			}
		}))
	}

	const onSearch = () => {
		const { data } = state;
		setState(prevState => ({
			...prevState,
			loading: true
		}))
		const payload = {
			startDate: convertDay(data.start),
			endDate: convertDay(data.end)
		}	 

		props.getTopAe(payload, data.start, data.end)
			.then(() => setState(prevState => ({
				...prevState,
				loading: false
			})))
			.catch(err => {
				if (!err.response) {
					setState(prevState => ({
						...prevState,
						loading: false,
						errors: {
							global: 'Terdapat kesalahan'
						}
					}))
				}else{
					setState(prevState => ({
						...prevState,
						loading: false,
						errors: {
							global: 'Data not found'
						}
					}))
				}
			})
	}

	const handleClose = () => setState(prevState => ({
		...prevState,
		errors: {}
	}))

	const { errors } = state;

	return(
		<div className={classes.root}>
			<LoaderBackdrop loading={state.loading} />
			<MessageInfo 
				open={!!errors.global} 
				variant="error" 
				message={errors.global}
				onClose={handleClose} 
			/>
			<Grid container spacing={2}>
				<Grid item lg={12} md={12} xl={12} xs={12}>
					<Grid container spacing={2} style={{marginBottom: 5}}>
						<Grid item lg={6} md={6} xl={12} xs={12} className={classes.title}>
							<Title />
						</Grid>
						<Grid item lg={6} md={6} xl={12} xs={12} className={classes.title}>
							<Search 
								value={state.data}
								onChange={handleChange}
								onSubmit={onSearch}
							/>
						</Grid>
					</Grid>
					<Divider />
				</Grid>
				<Grid item lg={12} md={12} xl={12} xs={12}>
					<Table 
						list={props.data}
					/>
				</Grid>
			</Grid>
		</div>
	);
}

TopAe.propTypes = {
	getTopAe: PropTypes.func.isRequired,
	data: PropTypes.array.isRequired,
	title: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return{
		data: state.ae.top,
		title: state.ae.searchParamTop
	}
}

export default connect(mapStateToProps, { getTopAe })(TopAe);