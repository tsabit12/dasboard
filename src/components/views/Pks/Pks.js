import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	Grid,
	Breadcrumbs,
	Typography,
	Divider
} from "@material-ui/core";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import {
	SearchOptions,
	TablePks
} from "./components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRegional, getPks } from "../../../actions/report";
import api from "../../../api";
import Loader from "../LoaderBackdrop";
import MessageInfo from "../MessageInfo";
import { convertDay } from "../../../utils";

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
		<Breadcrumbs aria-label="Breadcrumb" style={{marginBottom: 10}}>
			<div className={classes.link}>
				<AssignmentTurnedInIcon className={classes.icon} />
				LAPORAN KORPORAT
			</div>
			<Typography color="textPrimary" className={classes.link}>
				<WhatshotIcon className={classes.icon} />
				DAFTAR PKS
			</Typography>
		</Breadcrumbs>
	)
}

const Pks = props => {
	const [state, setState] = React.useState({
		data: {
			reg: '00',
			kprk: '00',
			jenis: '11',
			start: new Date(),
			end: new Date()
		},
		listKprk: [],
		loading: false,
		errors: {}
	});

	React.useEffect(() => {
		props.getRegional();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		if (props.param.reg) {
			setState(prevState => ({
				...prevState,
				data: {
					...props.param,
					kprk: '00'
				}
			}))
		}
	}, [props.param])

	const onChangeReg = (e) => {
		const { value, name } = e.target;
		setState(prevState => ({
			...prevState,
			data: {
				...prevState.data,
				[name]: value,
				kprk: '00'
			}
		}));
		
		if (value !== '00') {
			api.report.getKprk(value)
				.then(result => setState(prevState => ({
					...prevState,
					listKprk: result
				})))
		}
	}

	const handleChange = (e) => {
		const { value, name } = e.target;
		setState(prevState => ({
			...prevState,
			data: {
				...prevState.data,
				[name]: value
			},
			errors: {
				...prevState.errors,
				[name]: undefined
			}
		}))
	}

	const handleChangeDate = (e, name) => setState(prevState => ({
		...prevState,
		data: {
			...prevState.data,
			[name]: e
		}
	}))

	const onSearch = () => {
		const errors = validate(state.data);
		setState(prevState => ({
			...prevState,
			errors
		}))
		if (Object.keys(errors).length === 0) {
			setState(prevState => ({
				...prevState,
				loading: true
			}));
			const body = {
				payload: {
					...state.data,
					start: convertDay(state.data.start),
					end: convertDay(state.data.end)
				},
				param: { //redux
					...state.data
				}
			}

			props.getPks(body.payload, body.param)
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
							errors: err.response.data.errors
						}))
					}
				})
		}
	}

	const validate = (data) => {
		const errors = {};
		if (data.jenis === '11') errors.jenis = "Pilih jenis laporan";
		return errors;
	}

	const handleClose = () => setState(prevState => ({
		...prevState,
		errors: {}
	}))
 
	const classes = useStyles();
	return(
		<div className={classes.root}>
			<Loader loading={state.loading} />
			<MessageInfo 
				open={!!state.errors.global}
				variant="error" 
				message={state.errors.global}
				onClose={handleClose} 
			/>
			<Grid container spacing={2}>
				<Grid item lg={12} md={12} xl={12} xs={12}>
					<Title />
					<Divider />
				</Grid>
				<Grid item lg={12} md={12} xl={12} xs={12}>
					<SearchOptions 
						value={state.data}
						listReg={props.area}
						listKprk={state.listKprk}
						handleChangeReg={onChangeReg}
						onChange={handleChange}
						onChangeDate={handleChangeDate}
						onSubmit={onSearch}
						errors={state.errors}
					/>
					<Divider style={{marginTop: 10}} />
				</Grid>
				<Grid item lg={12} md={12} xl={12} xs={12}>
					<TablePks 
						data={props.datapks}
					/>
				</Grid>
			</Grid>
		</div>
	);	
}

Pks.propTypes = {
	area: PropTypes.array.isRequired,
	getRegional: PropTypes.func.isRequired,
	datapks: PropTypes.array.isRequired,
	getPks: PropTypes.func.isRequired,
	param: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return{
		area: state.report.area,
		datapks: state.report.pks.data,
		param: state.report.pks.searchParams
	}
}

export default connect(mapStateToProps, { getRegional, getPks })(Pks);