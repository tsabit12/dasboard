import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/styles'; 
import {
  Card,
  CardHeader,
  CardContent,
  // CardActions,
  Divider,
  Button,
  MenuList,
  MenuItem,
  Paper,
  Popper,
  Grow,
  ClickAwayListener
} from '@material-ui/core';
import clsx from "clsx";
import { Bar } from 'react-chartjs-2';
import palette from '../../../../theme/palette';
import { options } from "../../options";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles(theme => ({
  root: {
  	height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '400px'
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const Grafik = props => {
	const { list } = props;
	// const [open, setOpen] = React.useState(false);
  	const anchorRef = React.useRef(null);
  	// const [activeMenu, setActive] = React.useState('WEB & MOBILE');

	const [formState, setState] = React.useState({
		data: {
			labels: ['Loading..'],
			datasets: [	
				{
					label: 'data1',
					backgroundColor: palette.primary.main,
					data: [0]
				}
			]
		},
		active: {
			open: false,
			name: 'WEB & MOBILE'
		}
	})

	React.useEffect(() => {
		if (list.length > 0) {
			const labels 	= [];
			const totalPickup 	= [];
			const totalOrder 	= [];
			const totalTrans 	= [];
			list.forEach(row => {
				labels.push(row.hari);
				totalPickup.push(Number(row.totpickup));
				totalOrder.push(Number(row.totorder));
				totalTrans.push(Number(row.tottrans));
			});

			setState(prevState => ({
				...prevState,
				data: {
					labels,
					datasets: [{
							label: 'Order',
							backgroundColor: palette.primary.main,
							data: totalOrder
						},{
							label: 'Pickup',
							backgroundColor: palette.success.main,
							data: totalPickup
						},{
							label: 'Transaksi',
							backgroundColor: palette.error.main,
							data: totalTrans
					}]
				}
			}))
		}
	}, [list])

	const classes = useStyles();

	const handleToggle = () => {
		setState(prevState => ({
			...prevState,
			active: {
				...prevState.active,
				open: !prevState.active.open
			}
		}))
	};

	const handleClose = (event) => {
	    if (anchorRef.current && anchorRef.current.contains(event.target)) {
	      return;
	    }
	    
	    setState(prevState => ({
			...prevState,
			active: {
				...prevState.active,
				open: false
			}
		}))
	};

	const onChangeMenu = (event, name) => {
		setState(prevState => ({
			...prevState,
			active: {
				open: false,
				name: name
			}
		}))
	}

	function handleListKeyDown(event) {
	    if (event.key === 'Tab') {
	      event.preventDefault();
	      setState(prevState => ({
			...prevState,
			active: {
				...prevState.active,
				open: false
			}
		}))
	    }
	}

	const prevOpen = React.useRef(formState.active.open);

	React.useEffect(() => {
	    if (prevOpen.current === true && formState.active.open === false) {
	      anchorRef.current.focus();
	    }

	    prevOpen.current = formState.active.open;
	}, [formState.active.open]);	
	
	return(
		<Card
		  className={clsx(classes.root)}
		>
			<CardHeader
		        action={
		        	<div>
			          <Button
			            size="small"
			            variant="text"
			            ref={anchorRef}
				        aria-controls={formState.active.open ? 'menu-list-grow' : undefined}
				        aria-haspopup="true"
				        onClick={handleToggle}
			          >
			            {formState.active.name} <ArrowDropDownIcon />
			          </Button>
			          	<Popper open={formState.active.open} anchorEl={anchorRef.current} style={{zIndex: 1}} role={undefined} transition disablePortal>
				          {({ TransitionProps, placement }) => (
				            <Grow
				              {...TransitionProps}
				              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
				            >
				              <Paper>
				                <ClickAwayListener onClickAway={handleClose}>
				                  <MenuList autoFocusItem={formState.active.open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
				                    <MenuItem onClick={(e) => onChangeMenu(e, 'WEB & MOBILE')}>WEB & MOBILE</MenuItem>
				                    <MenuItem onClick={(e) => onChangeMenu(e, 'MOBILE')}>MOBILE</MenuItem>
				                    <MenuItem onClick={(e) => onChangeMenu(e, 'WEB')}>WEB</MenuItem>
				                  </MenuList>
				                </ClickAwayListener>
				              </Paper>
				            </Grow>
				          )}
				        </Popper>
		          	</div>
		        }
		        title="REPORT ORDER 7 HARI TERAKHIR"
		    />
			<Divider />
			<CardContent>
				<div className={classes.chartContainer}>
		    		<Bar
			            data={formState.data}
			            options={options}
			        />
		    	</div>
			</CardContent>
		</Card>
	);
}

Grafik.propTypes = {
	list: PropTypes.array.isRequired
}

export default Grafik;