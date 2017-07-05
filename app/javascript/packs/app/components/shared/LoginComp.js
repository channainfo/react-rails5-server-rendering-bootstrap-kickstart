import React from 'react'

import { ControlLabel, FormControl, Grid, Row, Col, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import UserAccessToken from '../../models/UserAccessToken'
import Me              from '../../models/Me'
import Location        from '../../models/Location'

export default class LoginComp extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      loggedIn: UserAccessToken.getInstance().isUserSignedIn()
    }
  }

  updateUIState(name, value) {
    var updater = {}
    updater[name] = value
    this.setState(updater)
  }

  login() {
    var userAccessToken = UserAccessToken.getInstance()
    userAccessToken.signInUser(this.state, (jsonResponse) => {
      Me.request(() => {
        this.setState({loggedIn: userAccessToken.isUserSignedIn()})
      })
    })
  }


  render() {

    if(this.state.loggedIn){
      Location.request()
      return (
        <Redirect to={Me.defaultHome()} />
      )
    }
    return(
        <form className='SearchBox'>
          <Grid>
            <Row className="show-grid">

              <Col sm={12} md={12}>
                <ControlLabel>Username</ControlLabel>
                <FormControl type="text"
                             label="Text"
                             onChange={(e) => {this.updateUIState('username', e.target.value)}}
                             value={this.state.username}/>
              </Col>

              <Col sm={12} md={12}>
                <ControlLabel>Password</ControlLabel>
                <FormControl type="password"
                             label="Text"
                             onChange={(e) => {this.updateUIState('password', e.target.value)}}
                             value={this.state.password}/>
              </Col>

              <Col sm={12} md={12}>
                <div><ControlLabel>&nbsp;</ControlLabel></div>
                <Button onClick={()=>{ this.login()}}> Login</Button>
              </Col>

            </Row>
          </Grid>

        </form>
    )
  }
}
