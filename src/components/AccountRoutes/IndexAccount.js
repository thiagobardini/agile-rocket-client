import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { accountIndex } from '../../api/accounts'
import Spinner from 'react-bootstrap/Spinner'

class AccountIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      accounts: null,
      index: 0
    }
  }
  componentDidMount () {
    const { msgAlert, user } = this.props
    accountIndex(user)
      .then(res => this.setState({ accounts: res.data.accounts }))
      .then(() => msgAlert({
        heading: 'Loaded accounts!',
        message: 'All accounts ',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to load the accounts!',
          message: 'The accounts have an error' + error.message,
          variant: 'danger'
        })
      })
  }

  increaseIndex () {
    this.setState({
      index: this.state.index + 1
    })
  }
  render () {
    const { accounts } = this.state
    if (!accounts) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">loading</span>
        </Spinner>
      )
    }

    const accountJsx = accounts.map(account => (
      <div className="card" key={account._id}>
        <div className="card-body">
          <Link to={`/accounts/${account._id}`} key={account._id}><h4 className="card-title">{account.accountName}</h4></Link>
          <p className="card-text">{account.industry}</p>
          <p className="card-text">{account.contact}</p>
          <p className="card-text">{account.email}</p>
          <p className="card-text">{account.address}</p>
          <p className="card-text">{account.phone}</p>
          <p className="card-text">User Name: {account.owner.userName}</p>
          <p className="card-text"><small className="text-muted">Created: {account.dateCreated.substring(0, 10)}</small></p>
        </div>
      </div>

    ))
    return (
      <div>
        {this.state.index}
        <button onClick={() => this.increaseIndex()}>Increase index </button>
        <button><Link to={'/account-create'}>Create Account</Link></button>
        <h6>{accountJsx}</h6>
      </div>
    )
  }
}
export default withRouter(AccountIndex)
