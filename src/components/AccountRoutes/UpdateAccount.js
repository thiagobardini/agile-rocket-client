import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import AccountForm from '../AccountForm/AccountForm'

import { accountShow, accountUpdate } from '../../api/accounts'

class AccountUpdate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      account: {
        accountName: '',
        industry: '',
        contact: '',
        email: '',
        address: '',
        phone: ''
      },
      updated: false
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props
    accountShow(user._id)
      .then(res => this.setState({ account: res.data.account }))
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
    const { account } = this.state
    accountUpdate(match.params.id, account, user)
      .then(res => this.setState({ updated: true }))
      .then(() => {
        msgAlert({
          heading: 'Updated account successfully',
          message: 'Updated account',
          variant: 'success'
        })
      })
      .catch(error => {
        msgAlert({
          heading: 'Failed to update account',
          message: 'Could not update account with error:' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { account, updated } = this.state
    if (updated) {
      return <Redirect to={`/accounts/${this.state.account._id}`} />
    }

    return (
      <div>
        <h3>Edit account</h3>
        <AccountForm
          account={account}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}

export default withRouter(AccountUpdate)
