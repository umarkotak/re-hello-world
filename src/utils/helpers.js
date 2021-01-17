import Cookies from 'js-cookie'

export const isLoggedIn = () => {
  let isLogin = Cookies.get('user_token')
  return isLogin ? true : false
}
