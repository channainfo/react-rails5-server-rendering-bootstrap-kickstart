import React from 'react'

import { Grid, Row, Col } from 'react-bootstrap'

import Me from '../../models/Me'

export default class ProfileComp extends React.Component {
  render() {
    var user = Me.getCache().attributes
    var operator = null
    if(user.operator){
      operator = (
        <Row className="show-grid">
          <Col sm={6} md={6}> Operator </Col>
          <Col sm={6} md={6}>
            <img src={user['operator']['logo']['medium_url']} alt={'Logo'} />
            {user['operator']['name']}
          </Col>
        </Row>
      )
    }

    return(
      <div className='SearchBox'>
        <form>
          <Grid>
            <Row className="show-grid">

              <Col sm={6} md={6}> Name </Col>
              <Col sm={6} md={6}> {user['first_name']} </Col>

              <Col sm={6} md={6}> Email </Col>
              <Col sm={6} md={6}> {user['email']} </Col>

              <Col sm={6} md={6}> Address </Col>
              <Col sm={6} md={6}> {user['address']} </Col>

              <Col sm={6} md={6}> Gender </Col>
              <Col sm={6} md={6}> {user['gender']} </Col>
            </Row>
            {operator}
          </Grid>

        </form>
      </div>
    )
  }
}
