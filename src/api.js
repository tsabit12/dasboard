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
				.then(res => res.data),
		getMinus: (payload) => 
			axios.post(`${process.env.REACT_APP_API}/ae/getMinus15`, {
				...payload
			}).then(res => res.data.result),
		getTotal: () =>
			axios.post(`${process.env.REACT_APP_API}/ae/getTotalRow`)
				.then(res => res.data.result)
	},
	report: {
		getRegional: () =>
			axios.post(`${process.env.REACT_APP_API}/report/getArea`)
				.then(res => res.data.result),
		getKprk: (area) =>
			axios.post(`${process.env.REACT_APP_API}/report/getKprk`, {
				area: area
			}).then(res => res.data.result),
		getPeriodePks: () =>
			axios.post(`${process.env.REACT_APP_API}/report/getPeriodePks`)
				.then(res => res.data.result),
		getPks: (payload) => 
			axios.post(`${process.env.REACT_APP_API}/report/getPks`, {
				...payload
			}).then(res => res.data.result)
	}
}