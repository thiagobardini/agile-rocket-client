import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'

// IMPORT ACCOUNT CRUD COMPONENTS
import AccountCreate from './components/AccountRoutes/CreateAccount'
import AccountIndex from './components/AccountRoutes/IndexAccount'
import AccountShow from './components/AccountRoutes/ShowAccount'
import AccountUpdate from './components/AccountRoutes/UpdateAccount'
import HomePageAccount from './components/AccountRoutes/HomePageAccount'
import './index.scss'

// OPPORTUNITIES COMPONENTS
import OpportunityCreate from './components/OpportunityRoutes/CreateOpportunity'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/account-create' render={() => (
            <AccountCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/accounts' render={() => (
            <AccountIndex msgAlert={this.msgAlert} user={user} />
          )} />
          <Route user={user} exact path='/accounts/:id' render={() => (
            <AccountShow msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/accounts/:id/edit' render={() => (
            <AccountUpdate msgAlert={this.msgAlert} user={user} />
          )}/>
          <Route exact path='/' render={() => (
            <div className="jumbotron">
              <h1 className="display-4">Welcome!</h1>
              <p className="lead">Agile Rocket -  CRM</p>
              <hr className="my-4"/>
            </div>
          )}/>
          <AuthenticatedRoute user={user} exact path='/' render={() => (
            <HomePageAccount msgAlert={this.msgAlert} />
          )}/>
          <AuthenticatedRoute user={user} path='/accounts/:id/opportunities' render={() => (
            <OpportunityCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/accounts/:id/opportunity-create' render={() => (
            <OpportunityCreate msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
        <div className="jumbotron jumbotron-fluid fixed-bottom footer-group mt-5">
          <div className="container-fluid">
            <p>Copyright &copy; 2021 - by <a href="https://github.com/thiagobardini" className="button gitRepo" data-abc="true">Thiago Bardini</a></p>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default App
