import Cookies from 'js-cookie'

export const isLoggedIn = () => {
  let isLogin = Cookies.get('user_data_logged_in')
  return isLogin ? true : false
}

export const userLoggedIn = () => {
  const username = Cookies.get('user_data_username')
  const email = Cookies.get('user_data_email')
  const role = Cookies.get('user_data_role')
  return {
    username: username,
    email: email,
    role: role,
  }
}

export const userLoggedOut = () => {
  Cookies.remove('user_data_logged_in')
  Cookies.remove('user_data_auth_token')
  Cookies.remove('user_data_username')
  Cookies.remove('user_data_email')
  Cookies.remove('user_data_role')
  window.location.href = '/'
}
