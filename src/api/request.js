import axios from '@/libs/api.request'
import { Message, Table } from 'iview';
export default{
    install(Vue){    
         // 公共ajax查询
        const ajaxSubmit = (actionDo, param, callback) => {
            let url = '/sysnb/' + actionDo;
            axios.request({ url: url, data: param, method: 'post'}).then((res) => {
                let resData = res.data
                if(typeof resData == 'string') resData = JSON.parse(resData)
                if(resData.errorCode == '0000') {
                    callback(resData)
                }else {
                    console.log(Message)
                    console.log(resData)
                    Message.error(resData.errorMsg)

                    // 登录超时，返回
                    if(resData.errorCode == 'PLT0013'){
                        localStorage.setItem('userToken', '')
                        window.location.href = '/login';
                    }
                }
                
            }, (res) => {
                Message.error(resData.errorMsg)
                return
            })  
        }
        const ajaxSubmitGet = (actionDo, param, callback) => {

            let newParam = '';  
            for(var name in param){//把传入的param对象转变成 xx.do?pageNo=0&pageSize=10这种形式
                newParam += name + '=' + param[name] + '&';
            }
            newParam = newParam.slice(0,newParam.lastIndexOf('&'))//去掉newParam的最后一个"$"

            let url = ''
            if(param == '' || isEmptyObject(param) == true){
                url = '/sysnb/' + actionDo ;
            }else {
                url = '/sysnb/' + actionDo + '?' + newParam;
            }
            //判断一个对象是否为空
            function isEmptyObject(e) {  
                var t;  
                for (t in e)  
                    return !1;  
                return !0  
            }  

            axios.request({ url: url, method: 'get' }).then((res) => {
                let resData = res.data
                if(typeof resData == 'string') resData = JSON.parse(resData);

                if(resData.errorCode == '0000') {
                    callback(resData)
                }else {
                   Message.error(resData.errorMsg)
                   // 登录超时，返回
                   if(resData.errorCode == 'PLT0013'){
                        localStorage.setItem('userToken', '')
                       window.location.href = '/login';
                   }
                }

            }, (res) => {
                Message.error(resData.errorMsg)
                return
            });
        }


        // vue全局方法注入
        Vue.prototype._ajaxSubmit = ajaxSubmit
        Vue.prototype._ajaxSubmitGet = ajaxSubmitGet
    }
}