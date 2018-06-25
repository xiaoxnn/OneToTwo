
import {getFetch, postFetch} from '../../utils/network/request/HttpExtension'
import API_HOME  from '../../constants/urlsConfig'
import  url from '../../constants/urls'
const news = params =>  getFetch(`${''}${url.news}`, params)

export default {
    news,
}