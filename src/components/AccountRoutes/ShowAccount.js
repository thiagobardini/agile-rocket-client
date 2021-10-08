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
    const accountContent = account => {
      const content = []
      for (const item in account.opportunities) {
        // console.log('loop' + item)
        content.push(<li key={item._id}>{item.accountName}</li>)
      }
      console.log(content)
      return content
    }
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
      return <Redirect to='/'/>
    } else if ((user.email !== account.owner.email) && (account.opportunities[0] !== undefined)) {
      accountJsx = (
        <div className="card" key={account._id}>
          <div className="card-body">
            <h4 className="card-title">{account.accountName}</h4>
            <p className="card-text"><span className="text-muted">Industry: </span>{account.industry}</p>
            <p className="card-text"><span className="text-muted">Contact: </span>{account.contact}</p>
            <p className="card-text"><span className="text-muted">Email: </span>{account.email}</p>
            <p className="card-text"><span className="text-muted">Address: </span>{account.address}</p>
            <p className="card-text"><span className="text-muted">Phone: </span>{account.phone}</p>
            <p className="card-text"><span className="text-muted">User Name: </span>{account.owner.userName}</p>
            <p className="card-text"><small className="text-muted">Created: {account.dateCreated.substring(0, 10)}</small></p>
            {/* <button onClick={this.deleteAccount}><Link to={'/'}>Delete</Link></button>
            <button><Link to={'/accounts/' + this.props.match.params.id + '/edit/'}>Update Account</Link></button> */}
            <hr/>
            {/* <button><Link to={'/accounts/' + this.props.match.params.id + '/opportunity-create'}>Create Opportunity</Link></button> */}
            <p className="card-text"><span className="text-muted">Opportunity Name: </span>{account.opportunities[0].opportunityName}</p>
            <p className="card-text"><span className="text-muted">Stage: </span>{account.opportunities[0].stage}</p>
            <p className="card-text"><span className="text-muted">Probability: </span>{account.opportunities[0].probability}</p>
            <p className="card-text"><span className="text-muted">Amount: </span>{account.opportunities[0].amount}</p>
            <p className="card-text"><span className="text-muted">Close Date: </span>{account.opportunities[0].closeDate}</p>
            <p className="card-text"><small className="text-muted">Created: {account.opportunities[0].dateCreated.substring(0, 10)}</small></p>
          </div>
        </div>
      )
    } else if ((user.email !== account.owner.email) && (account.opportunities[0] === undefined)) {
      accountJsx = (
        <div className="card" key={account._id}>
          <div className="card-body">
            <h4 className="card-title">{account.accountName}</h4>
            <p className="card-text"><span className="text-muted">Industry: </span>{account.industry}</p>
            <p className="card-text"><span className="text-muted">Contact: </span>{account.contact}</p>
            <p className="card-text"><span className="text-muted">Email: </span>{account.email}</p>
            <p className="card-text"><span className="text-muted">Address: </span>{account.address}</p>
            <p className="card-text"><span className="text-muted">Phone: </span>{account.phone}</p>
            <p className="card-text"><span className="text-muted">User Name: </span>{account.owner.userName}</p>
            <p className="card-text"><small className="text-muted">Created: {account.dateCreated.substring(0, 10)}</small></p>
            {/* <button onClick={this.deleteAccount}><Link to={'/'}>Delete</Link></button>
            <button><Link to={'/accounts/' + this.props.match.params.id + '/edit/'}>Update Account</Link></button>
            <hr/>
            <button><Link to={'/accounts/' + this.props.match.params.id + '/opportunity-create'}>Create Opportunity</Link></button> */}
          </div>
        </div>
      )
    } else if ((user.email === account.owner.email) && (account.opportunities[0] !== undefined)) {
      console.log(account)
      accountJsx = (
        <div className="card" key={account._id}>
          <div className="card-body">
            <h4 className="card-title">{account.accountName}</h4>
            <p className="card-text"><span className="text-muted">Industry: </span>{account.industry}</p>
            <p className="card-text"><span className="text-muted">Contact: </span>{account.contact}</p>
            <p className="card-text"><span className="text-muted">Email: </span>{account.email}</p>
            <p className="card-text"><span className="text-muted">Address: </span>{account.address}</p>
            <p className="card-text"><span className="text-muted">Phone: </span>{account.phone}</p>
            <p className="card-text"><span className="text-muted">User Name: </span>{account.owner.userName}</p>
            <p className="card-text"><small className="text-muted">Created: {account.dateCreated.substring(0, 10)}</small></p>
            <button onClick={this.deleteAccount}><Link to={'/'}>Delete</Link></button>
            <button><Link to={'/accounts/' + this.props.match.params.id + '/edit/'}>Update Account</Link></button>
            <hr/>
            <button><Link to={'/accounts/' + this.props.match.params.id + '/opportunity-create'}>Create Opportunity</Link></button>
            <p className="card-text"><span className="text-muted">Opportunity Name: </span>{account.opportunities[0].opportunityName}</p>
            <p className="card-text"><span className="text-muted">Stage: </span>{account.opportunities[0].stage}</p>
            <p className="card-text"><span className="text-muted">Probability: </span>{account.opportunities[0].probability}</p>
            <p className="card-text"><span className="text-muted">Amount: </span>{account.opportunities[0].amount}</p>
            <p className="card-text"><span className="text-muted">Close Date: </span>{account.opportunities[0].closeDate}</p>
            <p className="card-text"><small className="text-muted">Created: {account.opportunities[0].dateCreated.substring(0, 10)}</small></p>
          </div>
          <ul>
            <li>{accountContent}</li>
          </ul>
        </div>
      )
    } else if ((user.email === account.owner.email) && (account.opportunities[0] === undefined)) {
      accountJsx = (
        <div className="card" key={account._id}>
          <div className="card-body">
            <h4 className="card-title">{account.accountName}</h4>
            <p className="card-text"><span className="text-muted">Industry: </span>{account.industry}</p>
            <p className="card-text"><span className="text-muted">Contact: </span>{account.contact}</p>
            <p className="card-text"><span className="text-muted">Email: </span>{account.email}</p>
            <p className="card-text"><span className="text-muted">Address: </span>{account.address}</p>
            <p className="card-text"><span className="text-muted">Phone: </span>{account.phone}</p>
            <p className="card-text"><span className="text-muted">User Name: </span>{account.owner.userName}</p>
            <p className="card-text"><small className="text-muted">Created: {account.dateCreated.substring(0, 10)}</small></p>
            <button onClick={this.deleteAccount}><Link to={'/'}>Delete</Link></button>
            <button><Link to={'/accounts/' + this.props.match.params.id + '/edit/'}>Update Account</Link></button>
            <hr/>
            <button><Link to={'/accounts/' + this.props.match.params.id + '/opportunity-create'}>Create Opportunity</Link></button>
            <hr/>
          </div>
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
