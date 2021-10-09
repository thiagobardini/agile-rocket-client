import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { accountIndex } from '../../api/accounts'
import Spinner from 'react-bootstrap/Spinner'
import '../../index.scss'

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

  // increaseIndex () {
  //   this.setState({
  //     index: this.state.index + 1
  //   })
  // }
  render () {
    const { accounts } = this.state
    let accountJsx = ''
    if (!accounts) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">loading</span>
        </Spinner>
      )
    }
    accountJsx = accounts.map(account => account.opportunities[0] === undefined ? (
      // <div className="card" key={account._id}>
      //   <div className="card-body">
      //     <Link to={`/accounts/${account._id}`} key={account._id}><h4 className="card-title">{account.accountName}</h4></Link>
      //     <p className="card-text">{account.industry}</p>
      //     <p className="card-text">{account.contact}</p>
      //     <p className="card-text">{account.email}</p>
      //     <p className="card-text">{account.address}</p>
      //     <p className="card-text">{account.phone}</p>
      //     <p className="card-text">User Name: {account.owner.userName}</p>
      //     <p className="card-text"><small className="text-muted">Created: {account.dateCreated.substring(0, 10)}</small></p>
      //   </div>
      // </div>
      <div className="py-2" key={account._id}>
        <span className="borderTable">
          <table className="table table-sm">
            <thead>
              <tr className="table-primary">
                <th scope="col">Account Name</th>
                <th scope="col">Industry</th>
                <th scope="col">Contact</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
                <th scope="col">User Name</th>
                <th scope="col">Created</th>
              </tr>
            </thead>
            <tbody>
              <tr className="tableCard">
                <td><Link to={`/accounts/${account._id}`} key={account._id}>{account.accountName}</Link></td>
                <td><Link to={`/accounts/${account._id}`} key={account._id}>{account.industry}</Link></td>
                <td><Link to={`/accounts/${account._id}`} key={account._id}>{account.contact}</Link></td>
                <td><Link to={`/accounts/${account._id}`} key={account._id}>{account.email}</Link></td>
                <td><Link to={`/accounts/${account._id}`} key={account._id}>{account.address}</Link></td>
                <td><Link to={`/accounts/${account._id}`} key={account._id}>{account.phone}</Link></td>
                <td><Link to={`/accounts/${account._id}`} key={account._id}>{account.owner.userName}</Link></td>
                <td><Link to={`/accounts/${account._id}`} key={account._id}>{account.dateCreated.substring(0, 10)}</Link></td>
              </tr>
            </tbody>
          </table>
          <table className="table table-sm tableCard">
            <thead>
              <tr className="table-warning">
                <th scope="col">Opportunity Name</th>
                <th scope="col">stage</th>
                <th scope="col">Probability</th>
                <th scope="col">Amount</th>
                <th scope="col">Date Created</th>
                <th scope="col">Close Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>No opportunities</tr>
            </tbody>
          </table>
        </span>
      </div>
    ) : (
      <div className="py-2" key={account._id}>
        <span className="borderTable">
          <table className="table table-sm tableCard">
            <thead>
              <tr className="table-primary">
                <th scope="col">Account Name</th>
                <th scope="col">Industry</th>
                <th scope="col">Contact</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
                <th scope="col">User Name</th>
                <th scope="col">Created</th>
              </tr>
            </thead>
            <tbody>
              <tr className="tableCard">
                <td><Link to={`/accounts/${account._id}`} key={account._id}>{account.accountName}</Link></td>
                <td><Link to={`/accounts/${account._id}`} key={account._id}>{account.industry}</Link></td>
                <td><Link to={`/accounts/${account._id}`} key={account._id}>{account.contact}</Link></td>
                <td><Link to={`/accounts/${account._id}`} key={account._id}>{account.email}</Link></td>
                <td><Link to={`/accounts/${account._id}`} key={account._id}>{account.address}</Link></td>
                <td><Link to={`/accounts/${account._id}`} key={account._id}>{account.phone}</Link></td>
                <td><Link to={`/accounts/${account._id}`} key={account._id}>{account.owner.userName}</Link></td>
                <td><Link to={`/accounts/${account._id}`} key={account._id}>{account.dateCreated.substring(0, 10)}</Link></td>
              </tr>
            </tbody>
          </table>
          <table className="table table-sm tableCard">
            <thead>
              <tr className="table-warning">
                <th scope="col">Opportunity Name</th>
                <th scope="col">stage</th>
                <th scope="col">Probability</th>
                <th scope="col">Amount</th>
                <th scope="col">Date Created</th>
                <th scope="col">Close Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{account.opportunities[0].opportunityName}</td>
                <td>{account.opportunities[0].stage}</td>
                <td>{account.opportunities[0].probability}</td>
                <td>{account.opportunities[0].amount}</td>
                <td>{account.opportunities[0].closeDate.substring(0, 10)}</td>
                <td>{account.opportunities[0].dateCreated.substring(0, 10)}</td>
              </tr>
            </tbody>
          </table>
        </span>
      </div>
    )
    )
    return (
      <div>
        {/* {this.state.index}
        <button onClick={() => this.increaseIndex()}>Increase index </button> */}
        <button type="button" className="btn btn-secondary justify-content-center mx-auto py-2"><Link to={'/account-create'}>Create Account</Link></button>
        <h6>{accountJsx}</h6>
      </div>
    )
  }
}
export default withRouter(AccountIndex)
