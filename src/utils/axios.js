import axios from 'axios';
import {
  Indicator,
  Toast
} from 'mint-ui';
import router from '@/router';
import {
	setSessionStorage,
	getSessionStorage,
	removeSessionStorage
} from '@/utils/mixin';
import store from '../store'


class Http {
  constructor(opts){
    this.domain = opts.domain
  }
  require(options) {
    if (!options.api) throw new Error('api 不能为空');
    if (!options.method) { options.method = 'POST' }; //不传递方法默认为POST
    if (options.loadingVisble === undefined) { options.loadingVisble = true }; // 不传递默认开启loading
    if (!options.loadingText) { options.loadingText = '加载中...' };
    if(options.loadingVisble){
        Indicator.open({
            text: options.loadingText,
        })
    };
    // options.param.MemberToken = options.param.MemberToken ? options.param.MemberToken : getSessionStorage('MemberToken');
    return new Promise((resolve,reject) => {
        return axios({
            ...options,
            url: options.api,
            baseURL: this.domain,  
        }).then(response => {
            Indicator.close();
            if(response.data.status === 'SUCCESS'){ //请求成功
                return resolve(response.data.data)
            }else{
                Toast({
                    message: response.data.retMsg,
                    position: 'bottom'
                });
                return reject(response.data)
            }
        },error => {
            Indicator.close();
            Toast({
                message: error,
                position: 'bottom'
            });
            return reject()
        })
    })
  }
}

// request拦截器
axios.interceptors.request.use(config => {
    const user = store.state.user
    config.data = {...config.data, ...user};
    return config
  }, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  })
  

export default Http;
