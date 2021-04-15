import axios from 'axios'
import apiUrl from '../apiConfig'

export const accountCreate = (account, user) => {
  return axios({
    url: apiUrl + '/accounts',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { account }
  })
}
