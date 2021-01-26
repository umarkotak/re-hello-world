import Cookies from 'js-cookie'

export const isLoggedIn = () => {
  let isLogin = Cookies.get('user_data_logged_in')
  return isLogin ? true : false
}

export const userLoggedIn = () => {
  const username = Cookies.get('user_data_username')
  const avatar_url = Cookies.get('user_data_avatar_url')
  const email = Cookies.get('user_data_email')
  const role = Cookies.get('user_data_role')
  return {
    username: username,
    avatar_url: avatar_url,
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

export const mappingListPosts = params => {
  let tmp = params && params.feeds.filter(i => i.contents.length)
  return {
    feeds: tmp,
  }
}

export const wordingLikesContent = (data, count) => {
  const val = count - data.length
  let word = ''
  data.forEach(element => {
    word += element + ', '
  })
  if (count > 0) {
    return `${word.slice(0, -2)} ${
      val > 1
        ? ` and ${val} Users like post`
        : data.length === 1
        ? ` and ${data.length} User like post`
        : `like post`
    }`
  } else {
    return ``
  }
}

export const randomColor = number => {
  const arr_color = ['#e74c3c', '#f39c12', '#2ecc71', '#e67e22', '#2c3e50']
  return arr_color.slice(0, number)
}
