
import {getFetch, postFetch} from '../../utils/network/request/HttpExtension'
import API_HOME  from '../../constants/urlsConfig'
import  url from '../../constants/urls'
const userInfo = params =>  getFetch(`${API_HOME}${url.Login}`, params)

export default {
    userInfo,
}