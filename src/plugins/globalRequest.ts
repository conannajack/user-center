/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import {extend} from 'umi-request';
import {message} from "antd";
import {history} from "@umijs/max";
import {stringify} from "@ant-design/pro-utils";




/**
 * 配置request请求时的默认参数
 */
const requestd = extend({

  credentials: 'include', // 默认请求是否带上cookie
  // requestType: 'form',
});

/**
 * 所以请求拦截器
 */
requestd.interceptors.request.use((url, options): any => {
  console.log(`do request url = ${url}`)
  return {
    url,
    options: {
      ...options,
      headers: {

      },
    },
  };
});

/**
 * 所有响应拦截器
 */
requestd.interceptors.response.use(async (response): Promise<any> => {
    const res =await  response.clone().json();
    if (res.code === 0){
      return  res.data;
    }
    if (res.code === 40100){
      message.error('请先登录');
      history.replace({
        pathname: '/user/login',
        search :stringify({
          redirect: location.pathname,
        })
      });

  }else {
      message.error(res.description)
    }



  return res.data;
});

export default requestd;
