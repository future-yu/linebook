import {async} from "q";

const axios = require('axios');
const host = 'http://127.0.0.1:8081';
export async function  getSearchInfo(page,input) {
    let response = await axios.get(host+'/search',{
        params:{
            page,
            input
        }
    });
    return response;
}

export async function getDetail(target) {
    let response = await axios.get(host+'/detail',{
        params:{
            target
        }
    });
    return response;
}

export async function loadThumb(target,page_num) {
    let response = await axios.get(host+'/thumb/page',{
        params:{
            target:target+'?p='+page_num
        }
    });
    return response;
}



