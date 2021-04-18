import axios from 'axios'
import apiUrl from '../apiConfig'

export const opportunityCreate = (opportunity, user, id) => {
  console.log('created opportunity is :', opportunity.reply)
  return axios({
    url: apiUrl + '/accounts/' + id + '/opportunity-create',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { opportunity }
  })
}
