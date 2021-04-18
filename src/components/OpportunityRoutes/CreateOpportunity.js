import React, { Component } from 'react'
import OpportunityForm from '../OpportunityForm/OpportunityForm'
import { opportunityCreate } from '../../api/opportunities'
import { withRouter, Redirect } from 'react-router-dom'

class OpportunityCreate extends Component {
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
      created: false
    }
  }
  handleChange = event => {
    event.persist()
    this.setState(state => {
      return {
        opportunity: { ...state.opportunity, [event.target.name]: event.target.value }
      }
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert, match } = this.props
    const { opportunity } = this.state
    console.log(`this is user ${user}, this is id ${match.params.id}, this is comment ${opportunity}`)
    opportunityCreate(opportunity, user, match.params.id)
      .then(res => this.setState({ created: true }))
      .then(() => msgAlert({
        heading: 'Created opportunity Successfully',
        message: 'Showing created opportunity',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to create opportunity',
          message: 'Could not create opportunity with error:' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    const { opportunity, created } = this.state
    const { match } = this.props
    if (created) {
      return <Redirect to={'/accounts/' + match.params.id} />
    }
    return (
      <div className='row'>
        <div className='col-sm-10 col-md-8 mx-auto mt-5'>
          <h3>Create opportunity</h3>
          <OpportunityForm
            opportunity={opportunity}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(OpportunityCreate)
