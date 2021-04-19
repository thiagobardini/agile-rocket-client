import React, { Component } from 'react'
import OpportunityForm from '../OpportunityForm/OpportunityForm'
import { opportunityUpdate } from '../../api/accounts'
import { withRouter, Redirect } from 'react-router-dom'

class OpportunitiesUpdate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      opportunity: {
        opportunityName: '',
        stage: '',
        probability: '',
        amount: '',
        closeDate: ''
      },
      updated: false
    }
  }

  componentDidMount () {
    const { msgAlert, user, match } = this.props
    opportunityUpdate(user.id)
      .then(res => this.setState({ opportunity: match.params.opportunity }))
      .then(() => console.log('ok'))
      .catch(error => {
        msgAlert({
          heading: 'Failed to load the account!',
          message: 'The account have an error' + error.message,
          variant: 'danger'
        })
      })
  }

  handleChange = event => {
    event.persist()
    this.setState(state => {
      return {
        account: { ...state.account, [event.target.name]: event.target.value }
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { user, match, msgAlert } = this.props
    const { opportunity } = this.state
    opportunityUpdate(match.params.id, opportunity, user)
      .then(res => this.setState({ updated: true }))
      .then(() => {
        msgAlert({
          heading: 'Updated opportunity successfully',
          message: 'Updated opportunity',
          variant: 'success'
        })
      })
      .catch(error => {
        msgAlert({
          heading: 'Failed to update opportunity',
          message: 'Could not update opportunity with error:' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { opportunity, updated } = this.state
    if (updated) {
      return <Redirect to={`/accounts/${this.state.account._id}`} />
    }

    return (
      <div>
        <h3>Edit Opportunities</h3>
        <OpportunityForm
          account={opportunity}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}

export default withRouter(OpportunitiesUpdate)
