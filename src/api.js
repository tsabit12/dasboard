import axios from "axios";

export default {
	user: {
		login: (payload) => 
			axios.post(`${process.env.REACT_APP_API}/auth/login`, {...payload })
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
			axios.post(`${process.env.REACT_APP_API}/getProduk`)
				.then(res => res.data.result),
		getToReg: () => 
			axios.post(`${process.env.REACT_APP_API}/GetPendapatan`)
				.then(res => res.data.result),
		getTopKrpk: () =>
			axios.post(`${process.env.REACT_APP_API}/GetPendapatan/topKprk`)
				.then(res => res.data.result)
	},
	ae: {
		getTop: () =>
			axios.post(`${process.env.REACT_APP_API}/ae`)
				.then(res => res.data)
	}
}