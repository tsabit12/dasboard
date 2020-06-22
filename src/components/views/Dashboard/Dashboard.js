import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { connect } from "react-redux";
import { getTopProduk } from "../../../actions/produk";
import { 
	Grid,
	Paper,
	Backdrop,
	CircularProgress
} from '@material-ui/core';

import { 
	BarChart, 
	TableProduk ,
	FormSearch
} from "./components";
import { convertDay } from "../../../utils";
import MessageInfo from "../MessageInfo";

const useStyle = makeStyles(theme => ({
	root: {
	    padding: theme.spacing(4)
	},
	paper: {
		marginBottom: '10px',
		padding: 10
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
	}
}));

const Dashboard = props => {
	const [state, setState] = React.useState({
		loading: false,
		errors: false,
		data: {
			start: new Date(),
			end: new Date()
		}
	})

	const onSearch = () => {
		const { data } = state;
		const payload = {
			start: convertDay(data.start),
			end: convertDay(data.end)
		};

		setState(prevState => ({
			...prevState,
			loading: true,
			errors: false
		}))

		props.getTopProduk(payload)
			.then(() => 
				setState(prevState => ({
					...prevState,
					loading: false
				})
			)).catch(err => 
				setState(prevState => ({
					...prevState,
					loading: false,
					errors: true
				})
			))
	}

	const handleChange = (value, name) => setState(prevState => ({
		...prevState,
		data: {
			...prevState.data,
			[name]: value
		}
	}))

	const classes = useStyle();

	return(
		<div className={classes.root}>
			<React.Fragment>
				<Backdrop className={classes.loadingBackdrop} open={state.loading} />
				{ state.loading && <CircularProgress className={classes.progress} /> }

				<MessageInfo 
					open={state.errors} 
					variant="error" 
					message="Data tidak ditemukan"
					onClose={() => setState(prevState => ({
						...prevState,
						errors: false
					}))} 
				/>
			</React.Fragment>
			<Paper className={classes.paper}>
				<FormSearch 
					onSubmit={onSearch} 
					payload={state.data}
					onChange={handleChange}
				/>
			</Paper>
			<Grid container spacing={4}>
			    <Grid item lg={6} md={6} xl={12} xs={12}>
		        	<BarChart 
		        		listproduk={props.topProduk} 
		        		search={props.param}
		        	/>
		        </Grid>
		        <Grid item lg={6} md={6} xl={6} xs={12}>	
		        	<TableProduk data={props.topProduk} />
		        </Grid>
		    </Grid>
		</div>
	);
}

function mapStateToProps(state) {
	return{
		topProduk: state.produk.data,
		param: state.produk.searchParam
	}
}

export default connect(mapStateToProps, { getTopProduk })(Dashboard);