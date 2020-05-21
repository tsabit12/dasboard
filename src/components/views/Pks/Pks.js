import React from "react";
import { withStyles } from '@material-ui/styles';
import { 
	Breadcrumbs,
	Typography,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Button,
	Backdrop,
  	CircularProgress
} from '@material-ui/core';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { connect } from "react-redux";
import { getRegional } from "../../../actions/report";
import PropTypes from "prop-types";
import api from "../../../api";

const ListArea = props => (
	<Select
      value={props.data.reg}
      onChange={props.handleChange}
      inputProps={{
        name: 'reg',
        id: 'reg-id',
      }}
    >
    	<MenuItem value='00'>SEMUA AREA</MenuItem>
    	{ props.area.map((list, index) => 
    		<MenuItem 
    			value={list.IDWILAYAH} 
    			key={index}>
    				{list.NAMAKTR}
    		</MenuItem> )}
    </Select>
);

const ListKprk = props => (
	<Select
      value={props.data.kprk}
      onChange={props.handleChange}
      inputProps={{
        name: 'kprk',
        id: 'kprk-id',
      }}
    >
    	<MenuItem value='00'>SEMUA KPRK</MenuItem>
    	{ props.list.map((row, index) => 
    		<MenuItem 
    			value={row.NOPENDSR} 
    			key={index}>
    				{row.NOPENDSR} - {row.NAMAKTR}
    		</MenuItem> )}
    </Select>
);


const ListPeriode = props => (
	<Select
      value={props.data.periode}
      onChange={props.handleChange}
      inputProps={{
        name: 'periode',
        id: 'periode-id',
      }}
    >
    	<MenuItem value="11">PILIH PERIODE</MenuItem>
    	{ props.periode.map((row, index) => 
    		<MenuItem 
    			value={row.awalpks} 
    			key={index}>
    				{row.awalpks}
    		</MenuItem> )}
    </Select>
);


const OptionsAll = props => (
	<Select
      value={props.data.reg}
      onChange={props.handleChange}
      inputProps={{
        name: 'reg',
        id: 'reg-id',
      }}
    >
    	<MenuItem value='00'>LOADING...</MenuItem>
    </Select>	
); 

const styles = theme => ({
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
	rootForm: {
		display: 'flex',
    	flexWrap: 'wrap',
    	marginTop: '8px'
	},
	formControl: {
	    margin: theme.spacing(1),
	    minWidth: 200
	},
	backdrop: {
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
})


class Pks extends React.Component{
	state = {
		data: {
			reg: '00',
			kprk: '00',
			jenis: '01',
			periode: '11'
		},
		kprk: [],
		periode: [],
		loading: false
	}

	componentDidMount(){
		this.props.getRegional();
		api.report.getPeriodePks()
			.then(res => this.setState({ periode: res }))
	}

	handleChangeReg = (event) => {
		const value = event.target.value;
		this.setState({
			data: {
				...this.state.data,
				reg: value,
				kprk: '00'
			}
		})
		api.report.getKprk(value)
			.then(res => this.setState({ kprk: res }))
	}

	handleChange = (event) => {
		const value = event.target.value;
		this.setState({
			data: {
				...this.state.data,
				[event.target.name]: value
			}
		})
	}

	onSubmit = () => {
		this.setState({ loading: true });
		setTimeout(() => {
			alert("Pks on progress in development..");
			this.setState({ loading: false });
		}, 3000)
	}

	render(){
		const { classes, area } = this.props;
		const { data, kprk, periode, loading } = this.state;
		return(
			<div elevation={0} className={classes.root}>
				<Backdrop className={classes.backdrop} open={loading} />
        		{ loading && <CircularProgress className={classes.progress} /> }

				<Breadcrumbs aria-label="Breadcrumb">
			        <div className={classes.link}>
			        	<AssignmentTurnedInIcon className={classes.icon} />
				        LAPORAN KORPORAT
			        </div>
			        <Typography color="textPrimary" className={classes.link}>
			          <WhatshotIcon className={classes.icon} />
			          DAFTAR PKS
			        </Typography>
			    </Breadcrumbs>
				    <form className={classes.rootForm} autoComplete="off">
				    	<FormControl className={classes.formControl}>
	        				<InputLabel htmlFor="reg-id">AREA PENJUALAN</InputLabel>
	        				{ area.length > 0 ? 
	        					<ListArea 
	        						data={data} 
	        						area={area} 
	        						handleChange={this.handleChangeReg}
	        					/> : <OptionsAll data={data}/> }
	        			</FormControl>
	        			<FormControl className={classes.formControl}>
	        				<InputLabel htmlFor="kprk-id">KPRK</InputLabel>
	        				{ kprk.length > 0 ? <ListKprk list={kprk} data={data} handleChange={this.handleChange} /> : 
	        					<Select
							      value={data.kprk}
							      inputProps={{
							        name: 'kprk',
							        id: 'kprk-id',
							      }}
							    >
							    	<MenuItem value='00'>SEMUA KPRK</MenuItem>
							    </Select>}
	        			</FormControl>
	        			<FormControl className={classes.formControl} disabled={data.periode !== '11' ? true : false }>
	        				<InputLabel htmlFor="jenis-id">JENIS LAPORAN</InputLabel>
	        				<Select
						      value={data.jenis}
						      onChange={this.handleChange}
						      inputProps={{
						        name: 'jenis',
						        id: 'jenis-id',
						      }}
						    >
						    	<MenuItem value='01'>BARU</MenuItem>
						    	<MenuItem value='02'>EXISTING</MenuItem>
						    	<MenuItem value='03'>EXPIRED</MenuItem>
						    </Select>
	        			</FormControl>
	        			<FormControl className={classes.formControl}>
	        				<InputLabel htmlFor="periode-id">PERIODE</InputLabel>
	        				{ periode.length > 0 ? <ListPeriode data={data} periode={periode} handleChange={this.handleChange} /> : 
	        					<Select
							      value={data.periode}
							      inputProps={{
							        name: 'periode',
							        id: 'periode-id',
							      }}
							      
							    >
							    	<MenuItem value="11">LOADING...</MenuItem>
						    	</Select>}
	        			</FormControl>
	        			<div style={{marginLeft: '20px', alignSelf:'center', justifyContent: 'center'}}>
				    	<Button color="primary" onClick={this.onSubmit} variant="contained">TAMPILKAN</Button>
				    	</div>
				    </form>
			</div>
		);
	}
}

Pks.propTypes = {
	getRegional: PropTypes.func.isRequired,
	area: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return{
		area: state.report.area
	}
}

export default connect(mapStateToProps, { getRegional })(withStyles(styles)(Pks));