import Axios from 'axios'
import Cookies from 'js-cookie'
import { mappingListPosts } from '../utils/helpers'

const baseUrl = 'http://47.254.247.135/eartho'

export const ListPosts = async () => {
  let isLoading = true
  try {
    const { data } = await Axios.get(`${baseUrl}/home`)
    return {
      isLoading: !isLoading,
      data: mappingListPosts(data && data.data),
      isError: false,
    }
  } catch (error) {
    return {
      isLoading: isLoading,
      data: null,
      isError: error,
    }
  }
}

export const ListCategories = async () => {
  let isLoading = true
  try {
    const { data } = await Axios.get(`${baseUrl}/categories`)
    return {
      isLoading: !isLoading,
      data: data && data.data,
      isError: false,
    }
  } catch (error) {
    return {
      isLoading: isLoading,
      data: null,
      isError: error,
    }
  }
}

export const DetailPost = async params => {
  let isLoading = true
  try {
    const { data } = await Axios.get(`${baseUrl}/contents/${params.id}`)
    return {
      isLoading: !isLoading,
      data: data && data.data,
      isError: false,
    }
  } catch (error) {
    return {
      isLoading: isLoading,
      data: null,
      isError: error,
    }
  }
}

export const RegisterAccount = async params => {
  let isLoading = true
  try {
    const { data } = await Axios.post(
      `${baseUrl}/users/register`,
      JSON.stringify(params.data),
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
    return {
      isLoading: !isLoading,
      data: data && data.data,
      isError: false,
    }
  } catch (error) {
    return {
      isLoading: !isLoading,
      data: null,
      isError:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.errors,
    }
  }
}

export const AddPost = async params => {
  const token = Cookies.get('user_data_auth_token')
  try {
    const { data, status } = await Axios.post(
      `${baseUrl}/contents`,
      JSON.stringify(params.data),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    )
    if (status === 200) {
      return {
        data: data && data.data,
        isError: false,
      }
    }
  } catch (error) {
    return {
      data: null,
      isError:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.errors,
    }
  }
}

export const LoginAccount = async params => {
  try {
    const { data, status } = await Axios.post(
      `${baseUrl}/users/login`,
      JSON.stringify(params.data),
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
    if (status === 200) {
      Cookies.set('user_data_logged_in', true)
      Cookies.set('user_data_auth_token', data && data.data.session_key)
      Cookies.set('user_data_username', data && data.data.username)
      Cookies.set('user_data_email', data && data.data.email)
      Cookies.set('user_data_role', data && data.data.role)
      return {
        isError: false,
      }
    } else {
      return {
        isError: true,
      }
    }
  } catch (error) {
    return {
      data: null,
      isError:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.errors,
    }
  }
}
