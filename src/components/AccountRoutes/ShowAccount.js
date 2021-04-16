import React, { Component } from 'react'
import { accountShow, accountDelete } from '../../api/accounts'
import { withRouter, Link, Redirect } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

class ShowAccount extends Component {
  constructor (props) {
    super(props)
    this.state = {
      account: null,
      deleted: false
    }
  }
  componentDidMount () {
    const { msgAlert, match } = this.props
    accountShow(match.params.id)
      .then(res => this.setState({ account: res.data.account }))
      .then(() => msgAlert({
        heading: 'Loaded account successfully',
        message: 'Viewing account',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to load account',
          message: 'Could not load account with error:' + error.message,
          variant: 'danger'
        })
      })
  }
  deleteAccount = () => {
    const { msgAlert, user, match } = this.props
    accountDelete(match.params.id, user)
      .then(res => {
        this.setState({ deleted: true })
      })
      .then(() => msgAlert({
        heading: 'Deleted account successfully',
        message: 'Account deleted',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to delete account',
          message: 'Could not delete account with error:' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    const { user } = this.props
    const { account, deleted } = this.state
    // console.log('This is user: ', user)
    let accountJsx = ''
    if (deleted) {
      return <Redirect to='/'/>
    }
    if (!account) {
      return (
        <Spinner variant='primary' animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }
    if (!user) {
      accountJsx = (
        <div className="card-body">
          <h4 className="card-title">{account.accountName}</h4>
          <p className="card-text">{account.industry}</p>
          <p className="card-text">{account.contact}</p>
          <p className="card-text">{account.email}</p>
          <p className="card-text">{account.address}</p>
          <p className="card-text">{account.phone}</p>
          <p className="card-text"><small className="text-muted">Created: {account.dateCreated.substring(0, 10)}</small></p>
        </div>
      )
    } else if (user && user._id !== account.owner) {
      accountJsx = (
        <div className="card" key={account._id}>
          <div className="card-body">
            <h4 className="card-title">{account.accountName}</h4>
            <p className="card-text">{account.industry}</p>
            <p className="card-text">{account.contact}</p>
            <p className="card-text">{account.email}</p>
            <p className="card-text">{account.address}</p>
            <p className="card-text">{account.phone}</p>
            <p className="card-text"><small className="text-muted">Created: {account.dateCreated.substring(0, 10)}</small></p>
          </div>
        </div>
      )
    } else if (user && user._id === account.owner) {
      accountJsx = (
        <div key={account._id}>
          <h4>{account.accountName}</h4>
          <p>{account.industry}</p>
          <p>{account.contact}</p>
          <p>{account.email}</p>
          <p>{account.address}</p>
          <p>{account.phone}</p>
          <p><small className="text-muted">Created: {account.dateCreated.substring(0, 10)}</small></p>
          <button onClick={this.deleteAccount}><Link to={'/'}>Delete</Link></button>
          <button><Link to={'/accounts/' + this.props.match.params.id + '/edit/'}>Update Account</Link></button>
        </div>
      )
    }
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          {accountJsx}
        </div>
      </div>
    )
  }
}
export default withRouter(ShowAccount)