import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { accountIndex } from '../../api/accounts'
import Spinner from 'react-bootstrap/Spinner'

const cardContainerLayout = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'baseline'
}
class HomeAccountPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      accounts: null
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
          message: 'the posts have an error' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    function getRandomAccount (max) {
      return Math.floor(Math.random() * Math.floor(max))
    }
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
          <p className="card-text"><small className="text-muted">Created: {account.dateCreated.substring(0, 10)}</small></p>
        </div>
      </div>
    ))
    return (
      <div style={cardContainerLayout}>
        <div className="container" id="indexPage-message"><h3 className="h3Indexstyle">Recently Accounts!</h3>
          <div className="row">
            <div className="col-md">
              <h6>{accountJsx[getRandomAccount(accountJsx.length)]}</h6>
            </div>
            <div className="col-md">
              <h6>{accountJsx[getRandomAccount(accountJsx.length)]}</h6>
            </div>
          </div>
          <div className="row">
            <div className="col-md">
              <h6>{accountJsx[getRandomAccount(accountJsx.length)]}</h6>
            </div>
            <div className="col-md">
              <h6>{accountJsx[getRandomAccount(accountJsx.length)]}</h6>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(HomeAccountPage)
