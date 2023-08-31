import { AuthReponse } from 'src/types/auth.type'
import { http } from 'src/utils/http'

export const registerAccount = (data: { email: string; password: string }) => {
  return http.post<AuthReponse>('/register', data)
}

export const loginAccount = (data: { email: string; password: string }) => {
  return http.post<AuthReponse>('/login', data)
}

export const logoutAccount = () => {
  return http.post('/logout')
}
