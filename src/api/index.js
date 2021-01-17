import Axios from 'axios'

const baseUrl = 'http://47.254.247.135/eartho'

export const listPosts = async () => {
  let isLoading = true
  try {
    const { data } = await Axios.get(`${baseUrl}/home`)
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