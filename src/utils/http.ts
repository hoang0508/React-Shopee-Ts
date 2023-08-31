import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { HttpStatusCode } from 'src/constants/httpStatus.enum'
import { clearLS, getAccessTokenFromLS, saveAccessTokenToLS, setProfiletoLS } from './auth'
import { AuthReponse } from 'src/types/auth.type'

export const http = axios.create({
  baseURL: 'https://api-ecom.duthanhduoc.com/',
  // timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor
http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getAccessTokenFromLS()
    if (accessToken && config.headers) {
      config.headers.authorization = accessToken
      return config
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    const { url } = response?.config
    const data = response?.data as AuthReponse
    let accesstoken = data?.data?.access_token
    let profile = data?.data?.user
    if (url === '/login' || url === '/register') {
      saveAccessTokenToLS(accesstoken)
      setProfiletoLS(profile)
    } else if (url === '/logout') {
      accesstoken = ''
      clearLS()
    }
    return response
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
      const data: any | undefined = error.response?.data
      const message = data?.message || error.message
      toast.error(message)
    }
    return Promise.reject(error)
  }
)
