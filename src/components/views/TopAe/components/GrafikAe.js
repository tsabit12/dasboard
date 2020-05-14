import React from "react";
import { makeStyles } from '@material-ui/styles'; 
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button
} from '@material-ui/core';
import { Bar } from 'react-chartjs-2';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import clsx from "clsx";
import palette from '../../../../theme/palette';
import { options } from "../../Dashboard/components/options";

const useStyles = makeStyles(() => ({
  root: {
  	marginTop: '10px'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  chartContainer: {
    position: 'relative',
    height: '500px'
  }
}));

const GrafikAe = props => {
	const [formState, setState] = React.useState({
		data: {
			labels: ['Memuat..'],
			datasets: [	
				{
					label: 'Loading...',
					backgroundColor: palette.primary.main,
					data: [0]
				}
			]
		},
		show: false
	})

	const { className, data, ...rest } = props;

	React.useEffect(() => {
		if (data.length > 0) {
			const labels 	= [];
			const total 	= [];

			data.forEach(x => {
				total.push(Number(x.jumlah));
				labels.push(x.kantor);
			});

			setState(prevState => ({
				...prevState,
				data: {
					labels,
					datasets: [{
						label: 'Jumlah',
						backgroundColor: palette.warning.main,
						data: total
					}] 
				},
				show: true
			}))

		}
	}, [data])

	const classes = useStyles();

	const onMinimize = () => {
		if (data.length > 0) {
			setState(prevState => ({
				...prevState,
				show: !prevState.show
			}))
		}else{
			alert("Harap tunggu sedang memuat data..");
		}
	}

	return(
		<Card
	      {...rest}
	      className={clsx(classes.root, className)}
	    >
	      <CardHeader
	        action={
	          <Button
	            size="small"
	            variant="text"
	            onClick={onMinimize}
	          >
	          	{ formState.show ? <React.Fragment>
	          		Minimize <ArrowDropDownIcon />
	          	</React.Fragment> : <React.Fragment>
	          		{ data.length === 0 ? <React.Fragment>
	          			Loading <ArrowRightIcon />
	          		</React.Fragment> : <React.Fragment>
	          			Overview <ArrowRightIcon />
	          		</React.Fragment>}
	          	</React.Fragment> }
	          </Button>
	        }
	        title={data.length === 0 ? 'Memuat Grafik...' : 'GRAFIK' }
	      />
          { formState.show && <React.Fragment>
          	<Divider />
          	<CardContent>
	          	<div className={classes.chartContainer}>
		          	<Bar
			            data={formState.data}
			            options={options}
			        />
		        </div>
	        </CardContent>
	       </React.Fragment> }
	    </Card>
	);
}

export default GrafikAe;