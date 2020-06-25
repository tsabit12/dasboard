import React from "react";
import { makeStyles } from "@material-ui/styles";
import { 
	Grid,
	Breadcrumbs,
	Typography,
	Divider,
	Backdrop,
	CircularProgress
} from "@material-ui/core";
import AssessmentIcon from '@material-ui/icons/Assessment';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { 
	Search,
	Chart,
	Pie,
	Table
} from "./components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTopKrpk } from "../../../actions/grafik";
import { convertDay } from "../../../utils";
import palette from '../../../theme/palette';
import api from "../../../api";

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
}));

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
		default: return '#FFFFFF';
	}
}

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
				TOP 10 KANTOR POS
			</Typography>
		</Breadcrumbs>
	)
}

const TopKprk = props => {
	const [state, setState] = React.useState({
		data: {
			start: new Date(),
			end: new Date()
		},
		loading: false,
		chart: {},
		pie: {},
		errors: {}
	})

	React.useEffect(() => {
		if (props.grafik.length > 0 ) {
			const { start, end } = props.searchParam;
			const labels 	= [];
			const total 	= [];
			const totalB 	= [];
			const totalInPie = [];
			const backgroundColor = [];
			const dataPie 	= [];

			props.grafik.forEach((x, i) => {
				total.push(Number(x.total));
				totalB.push(Number(x.total2));
				labels.push(x.nopendsr);
				totalInPie.push(Number(x.total_persen));
				backgroundColor.push(getColor(i));
				dataPie.push({
					name: x.nopendsr,
					color: getColor(i),
					jumlah: Number(x.total_persen)
				})
			});

			setState(prevState => ({
				...prevState,
				data: {
					start: start,
					end: end
				},
				chart: {
					labels,
					datasets: [{
						label: 'Jumlah Realisasi',
						backgroundColor: palette.warning.main,
						data: total
					},{
						label: 'Jumlah Target',
						backgroundColor: palette.primary.main,
						data: totalB
					}] 
				},
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
				}
			}))
		}
	}, [props.grafik, props.searchParam])

	const handleChange = (value, name) => {
		setState(prevState => ({
			...prevState,
			data: {
				...prevState.data,
				[name]: value
			}
		}))
	}

	const handleSubmit = () => {
		const { start, end } = state.data;
		const value = {
			payload: {
				start: convertDay(start),
				end: convertDay(end)
			},
			param: {
				start,
				end
			}
		};

		setState(prevState => ({
			...prevState,
			loading: true
		}))

		props.getTopKrpk(value.payload, value.param)
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

	const onDownloadTable = (jsonString) => {
		const startF 	= convertDay(state.data.start);
		const endF 		= convertDay(state.data.end);
		const fileName 	= `TOP_KPRK(${startF})sd(${endF})`;
		api.grafik.downloadTopKprk(jsonString, fileName);
	}


	const { data, loading } = state;
	const classes = useStyles();


	return(
		<div className={classes.root}>
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
								value={data}
								onChange={handleChange}
								onSubmit={handleSubmit}
							/>
						</Grid>
					</Grid>
					<Divider />
				</Grid>
				<Grid item lg={8} md={8} xl={12} xs={12}>
					<Chart 
						data={state.chart}
					/>
				</Grid>
				<Grid item lg={4} md={4} xl={12} xs={12}>
					<Pie 
						data={state.pie}
					/>
				</Grid>
				{ props.grafik.length > 0 && 
					<Grid item lg={12} md={12} xl={12} xs={12}>
						<Table 
							data={props.grafik} 
							download={() => onDownloadTable(JSON.stringify(props.grafik))}
						/>
					</Grid> }
			</Grid>
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