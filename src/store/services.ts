import axios from 'axios'

export const getLoginUser = async (payload: string) => await axios.get(`https://neurobiomyko.tojest.dev/api/info-api/user/${payload}/channels`, {
  headers: {
    'Content-Type': 'application/json',
  }
})