import React from "react";
import { makeStyles } from '@material-ui/styles';
import { 
	Grid, 
	Breadcrumbs, 
	Typography, 
	Backdrop, 
	CircularProgress,
	Divider
} from '@material-ui/core';
import { 
	Search,
	Grafik,
	Pie,
	Table
} from "./components";
import { connect } from "react-redux";
import { getToReg } from "../../../actions/grafik";
import PropTypes from "prop-types";
import AssessmentIcon from '@material-ui/icons/Assessment';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { convertDay } from "../../../utils";
import palette from '../../../theme/palette';
import api from "../../../api";

const getColor = (index) => {
	switch(index){
		case 0:
			return '#FF5E14';
		case 1:
			return '#2F4F4F';
		case 2:
			return '#FF8C00';
		case 3:
			return '#612B04';
		case 4:
			return '#3F6104';
		case 5:
			return '#14D0FF';
		case 6:
			return '#1481FF';
		case 7:
			return '#1418FF';
		case 8:
			return '#9D14FF';
		case 9:
			return '#FF1414';
		case 10:
			return '#827C7C';
		default: return '#FFFFFF';
	}
}

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
	backdrop: {
	    position: 'relative',
	    background: 'black',
	    opacity: 0.5,
	    borderRadius: '5px' 
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
	title: {
		alignSelf: 'flex-end'
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
				TOP REGIONAL
			</Typography>
		</Breadcrumbs>
	)
}

const TopReg = props => {
	const [state, setState] = React.useState({
		data: {
			start: new Date(),
			end: new Date()
		},
		loading: false,
		pie: {},
		chart: {},
		errors: {}
	});

	React.useEffect(() => {
		if (props.grafik.length > 0) {
			//PIE
			const totalInPie 	= [];
			const dataPie 		= [];
			const backgroundColor = [];
			//CHART
			const totTarget 	= [];
			const totRealisasi 	= []; 
			//ALL
			const labels 		= [];

			props.grafik.forEach((x, i) => {
				//PIE
				labels.push(x.NamaKtr);
				totalInPie.push(Number(x.total_persen));
				dataPie.push({
					name: x.NamaKtr,
					color: getColor(i),
					jumlah: Number(x.total_persen)
				});
				backgroundColor.push(getColor(i));
				//CHART
				totTarget.push(Number(x.total2));
				totRealisasi.push(Number(x.total));
			})

			setState(prevState => ({
				...prevState,
				pie: {
					datasets: [{
						data: totalInPie,
						borderWidth: 8,
				        borderColor: '#FFFFFF',
				        hoverBorderColor: '#FFFFFF',
				        backgroundColor
					}],
					labels,
					dataPie
				},
				chart: {
					labels,
					datasets: [{
						label: 'Target',
						backgroundColor: palette.warning.main,
						data: totTarget
					},{
						label: 'Realisasi',
						backgroundColor: palette.secondary.light,
						data: totRealisasi
					}] 
				},
				data: {
					start: props.param.start,
					end: props.param.end
				}
			}))	
		}
	}, [props.grafik, props.param]);

	const handleChange = (value, name) => {
		setState(prevState => ({
			...prevState,
			data: {
				...prevState.data,
				[name]: value
			}
		}))
	}

	const handleSearch = () => {
		const { start, end } = state.data;
		const param = {
			payload: {
				start: convertDay(start),
				end: convertDay(end)	
			},
			search: {
				start,
				end
			}
		}

		setState(prevState => ({
			...prevState,
			loading: true
		}));

		props.getToReg(param)
			.then(() => setState(prevState => ({
				...prevState,
				loading: false
			})))
			.catch(err => {
				setState(prevState => ({
					...prevState,
					loading: false,
					errors: {
						global: 'Terdapat keslahan, silahkan cobalagi'
					}
				}))
			})
	}

	const handleDownload = (json) => {
		const startF 	= convertDay(state.data.start);
		const endF 		= convertDay(state.data.end);
		const fileName 	= `TOP_REG(${startF})sd(${endF})`;
		api.grafik.downloadTopReg(json, fileName);
	}

	const classes = useStyles();
	const { loading } = state;

	return(
		<div elevation={0} className={classes.root}>
			<Backdrop className={classes.loadingBackdrop} open={loading} />
			{ loading && <CircularProgress className={classes.progress} /> }
			<Grid container spacing={2}>
				<Grid item lg={12} md={12} xl={12} xs={12}>
					<Grid container spacing={2} style={{marginBottom: 5}}>
						<Grid item lg={6} md={6} xl={12} xs={12} className={classes.title}>
							<Title />
						</Grid>
						<Grid item lg={6} md={6} xl={12} xs={12}>
							<Search 
								value={state.data}
								onChange={handleChange}
								onSubmit={handleSearch}
							/>
						</Grid>
					</Grid>
					<Divider />
				</Grid>
				<Grid item lg={8} md={8} xl={12} xs={12}>
					<Grafik 
						data={state.chart}
					/>
				</Grid>
				<Grid item lg={4} md={4} xl={12} xs={12}>
					<Pie 
						data={state.pie}
					/>
				</Grid>
				{ props.grafik.length > 0 && <Grid item lg={12} md={12} xl={12} xs={12}>
					<Table 
						data={props.grafik}
						download={handleDownload}
					/>
				</Grid> }
			</Grid>
		</div>
	);
}

TopReg.propTypes = {
	getToReg: PropTypes.func.isRequired,
	grafik: PropTypes.array.isRequired,
	param: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return{
		grafik: state.grafik.topReg,
		param: state.grafik.searchReg
	}
}

export default connect(mapStateToProps, { getToReg })(TopReg);