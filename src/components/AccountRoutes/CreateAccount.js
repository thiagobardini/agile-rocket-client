import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AccountForm from '../AccountForm/AccountForm'
import { accountCreate } from '../../api/accounts'

class AccountCreate extends Component {
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
      createdAccountId: null
    }
  }
  handleChange = event => {
    event.persist()
    this.setState(state => {
      return {
        account: { ...state.account, [event.target.name]: event.target.value }
      }
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    const { account } = this.state
    accountCreate(account, user)
      .then(res => this.setState({ createdPostId: res.data.account._id }))
      .then(() => msgAlert({
        heading: 'Created account successfully',
        message: 'Showing created account',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to create account',
          message: 'Could not create account with error:' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    const { account, createdAccountId } = this.state
    if (createdAccountId) {
      return <Redirect to={`/accounts/${createdAccountId}`} />
    }
    return (
      <div className='row'>
        <div className='col-sm-10 col-md-8 mx-auto mt-5'>
          <h3>Create Account</h3>
          <AccountForm
            account={account}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}
export default AccountCreate
