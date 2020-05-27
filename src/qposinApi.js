import axios from "axios";
import md5 from "md5";
const url = 'https://qcomm.posindonesia.co.id:10444';

const curdate = () => {
	var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length === 1) {
         month = '0'+month;
    }
    if(day.toString().length === 1) {
         day = '0'+day;
    }   
    if(hour.toString().length === 1) {
         hour = '0'+hour;
    }
    if(minute.toString().length === 1) {
         minute = '0'+minute;
    }
    if(second.toString().length === 1) {
         second = '0'+second;
    }   

    var dateTime = year+'-'+month+'-'+day; //+' '+hour+':'+minute+':'+second;   
    return dateTime;
}

const getHashing = (spName, payload) => {
	return md5(spName,payload,curdate);
}

export default {
	getUser: (params) => axios.post(`${url}/getreport`, {
		...params,
		hashing: getHashing(params.sp_nama, params.par_data)
	}).then(res => res.data),
	getJumlah: () => axios.post(`${process.env.REACT_APP_API}/qposin/jmlData`)
		.then(res => res.data.result),
    getUserCity: () => axios.post(`${process.env.REACT_APP_API}/qposin/orderByKota`)
        .then(res => res.data.result),
    reportPerWeek: (payload) => axios.post(`${process.env.REACT_APP_API}/qposin/reportPerWeek`, {
        ...payload
    }).then(res => res.data.result),
    getReportProduk: () => axios.post(`${process.env.REACT_APP_API}/qposin/summaryJenis`)
        .then(res => res.data.result)
}