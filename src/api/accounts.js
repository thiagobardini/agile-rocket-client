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

export const accountIndex = (account, user) => {
  return axios({
    url: apiUrl + '/accounts',
    method: 'GET',
    data: { account }
  })
}

export const accountShow = (id) => {
  return axios({
    url: apiUrl + '/accounts/' + id,
    method: 'GET'
  })
}

export const accountDelete = (id, user) => {
  return axios({
    url: apiUrl + '/accounts/' + id,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const accountUpdate = (id, account, user) => {
  return axios({
    url: apiUrl + '/accounts/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { account }
  })
}
