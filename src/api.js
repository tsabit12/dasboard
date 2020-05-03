import axios from "axios";

export default {
	user: {
		login: (payload) => 
			axios.post(`${process.env.REACT_APP_API_B}/auth/login`, {...payload })
				.then(res => {
					const { data } = res;
					if (!data.result) {
						return Promise.reject(data);
					}else{
						return data.result;
					}
				})
	},
	grafik: {
		getProduk: () =>
			axios.post(`${process.env.REACT_APP_API_B}/getProduk`)
				.then(res => res.data.result)	
	}
}