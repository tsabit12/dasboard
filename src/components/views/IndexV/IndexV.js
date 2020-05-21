import React from "react";

const IndexV = props => {
	React.useEffect(() => {
		setTimeout(() => {
			props.history.push("/sales/home");
		}, 1000);
	}, [props.history])
	
	return(
		<div style={{position: 'absolute', width: '50%', height: '300px', left: '50%', margin: '0 0 0 -25%', top: '200px'}}>
			<center>
				<p>Selamat datang, sedang mengalihkan halaman...</p>
			</center>
		</div>
	);
}

export default IndexV;