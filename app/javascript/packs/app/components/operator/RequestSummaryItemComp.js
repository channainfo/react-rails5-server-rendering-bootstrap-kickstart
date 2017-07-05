import React from 'react'
import {
  Redirect,
} from 'react-router-dom'

import { Button } from 'react-bootstrap';

import RequestTripDelegate from '../../delegates/RequestTripDelegate'

import TimeAgo from 'react-timeago'

export default class RequestTripItemComp extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      redirectDetail: false
    }
  }

  viewAll(){
    //perform logic
    this.setState({redirectDetail: true})
  }

  render() {
    if(this.state.redirectDetail){
      let path = `/request-detail/${this.props.onDate}/${this.props.routeId}`
      return <Redirect to={path} />
    }

    let requestTrip = this.props.requestTrip
    let lastRequest = RequestTripDelegate.create(requestTrip['last_request_trip'])

    return (
      <div >
        <div className='clearfix'>
          <h4 style={ {float: 'left'}}>
            {requestTrip.origin['name']} -> {requestTrip.destination['name']}
          </h4>
          <h5 style= { {float: 'right'}}>
            About <TimeAgo date={lastRequest['created_at']} />
          </h5>
        </div>

        <div className='clearfix'>

          <i> Total search count today: {requestTrip['count']} </i>
          <br/>
          <b> {lastRequest['user_name']} </b> requesting
          <b> {lastRequest['number_of_paxs']} </b>
              Tickets between {lastRequest.fromHour()} - {lastRequest.toHour()} hours
          <br/>

          <br/>
          <Button onClick={ () => {this.viewAll() } }> View All </Button>
          <hr />
        </div>
      </div>
    )
  }
}
