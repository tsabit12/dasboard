import axios from "axios";
import FileDownload from "js-file-download";

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
		getProduk: (payload) =>
			axios.post(`${process.env.REACT_APP_API}/getProduk/getData`, {...payload})
				.then(res => res.data.result),
		getToReg: (payload) => 
			axios.post(`${process.env.REACT_APP_API}/GetPendapatan/topReg`, { ...payload })
				.then(res => res.data.result),
		getTopKrpk: (payload) =>
			axios.post(`${process.env.REACT_APP_API}/GetPendapatan/topKprkBaru`, { ...payload })
				.then(res => res.data.result),
		downloadTopKprk: (json, name) => 
			axios.get(`${process.env.REACT_APP_API}/excel/TopKprk`, {
				params: {
					data: json
				}
			})
			.then(response => {
				FileDownload(response.data, `${name}.xlsx`);
			})
	},
	ae: {
		getTop: (payload) =>
			axios.post(`${process.env.REACT_APP_API}/ae/getTop100`, { ...payload })
				.then(res => res.data),
		getMinus: (payload) => 
			axios.post(`${process.env.REACT_APP_API}/ae/getMinus15`, {
				...payload
			}).then(res => res.data.result),
		getTotal: (periode) =>
			axios.post(`${process.env.REACT_APP_API}/ae/getTotalRow`, {
				periode: periode
			}).then(res => res.data.result)
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
			}).then(res => res.data.result),
		getKinerja: (payload) => 
			axios.post(`${process.env.REACT_APP_API}/report/getKinerja`, {
				...payload
			}).then(res => res.data.result)
	}
}