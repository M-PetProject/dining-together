import axios from 'axios';
import {getSession, nvl} from '../util/cm_util.js';

// axios 설정
axios.defaults.baseURL = "/api"
axios.defaults.withCredentials = true;


export const axiosModule = axios.create(
    {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
            , 'Access-Control-Allow-Origin': '*'
            , 'Access-Control-Allow-Credentials' : true
            // , 'Authorization': 'Bearer ' + nvl(getSession('t'))
        }
    }
);
