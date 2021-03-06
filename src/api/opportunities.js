import axios from 'axios'
import apiUrl from '../apiConfig'

export const opportunityCreate = (opportunity, user, id) => {
  // console.log('created opportunity is :', opportunity.opportunityName)
  return axios({
    url: apiUrl + '/accounts/' + id + '/opportunities',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: { opportunity }
  })
}

// UPDATE
export const opportunityUpdate = (id, opportunity, user) => {
  return axios({
    url: apiUrl + '/accounts/' + id + '/opportunities',
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { opportunity }
  })
}
