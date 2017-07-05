import React from 'react'

import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import TimeAgo from 'react-timeago'

import OperatorResponseTrip from '../../models/operator/ResponseTrip'

export default class RequestTripDetailItemComp extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  reject(requestTripId){
    var options = { request_trip_id: requestTripId,
                    status: OperatorResponseTrip.REJECTED }

    OperatorResponseTrip.request(options, (jsonResponse)=> {
      console.log("response reject with ", options);
    })
  }

  offer(requestTripId, stopTimeResult) {
    var data = {}

    if(stopTimeResult.object().is_bus5){
      data = {
        seats: [
          {label: 'A1', price: 10, type: 'vip'},
          {label: 'A2', price: 10, type: 'vip'}
        ]
      }
    }

    var options = { request_trip_id: requestTripId,
                    trip_id: stopTimeResult.object().trip_id,
                    status: OperatorResponseTrip.ACCEPTED,
                    data: data
                  }

    OperatorResponseTrip.request(options, (jsonResponse)=>{
      console.log("response offer with", options);
    })
  }

  stopTimeResultMachedRequest() {
    var result = this.props.trips.filter( (stResult) => {
      return stResult.matched(this.props.requestTrip)
    })

    return result
  }

  disableReject(){
    let operatorResponse = this.props.operatorResponse
    if(operatorResponse !== undefined && operatorResponse.status === 'rejected')
      return true
    return false
  }

  disableOffer() {
    let operatorResponse = this.props.operatorResponse
    if(operatorResponse !== undefined && operatorResponse.status === 'accepted')
      return true
    return false
  }

  render() {
    var requestTrip = this.props.requestTrip
    var actions = <span> No matched </span>
    var operatorResponse = this.props.operatorResponse
    console.log("Operator Response", operatorResponse);

    var opeartorCTA = null
    if(operatorResponse === undefined){
      opeartorCTA = (<div>
        Be the first to offer this user
      </div> )
    }
    else{
      opeartorCTA =  (
        <div>
          <span className='label label-info'> {operatorResponse.status} </span>
          &nbsp;&nbsp;&nbsp;
         <TimeAgo date={operatorResponse['created_at']} />
       </div>
      )
    }

    var stopTimeResults = this.stopTimeResultMachedRequest()

    if(stopTimeResults.length > 0){
      let menuItems = stopTimeResults.map((stopTimeResult) => {
        return (
          <MenuItem onClick={(e)=> {this.offer(requestTrip['id'],stopTimeResult)}} key={stopTimeResult.object().trip_id} eventKey={stopTimeResult.object().trip_id}>
            <span> <b> {stopTimeResult.object().currency_type} {stopTimeResult.price() } </b> </span>
            -
            Depart <span> {stopTimeResult.departureTime()} </span>
          - <b>{stopTimeResult.object().seats_remaining}</b> seats left
          </MenuItem>
        )
      })

      actions = (
        <div>
          <Button onClick={ () => {this.reject(requestTrip['id'])} }
                  disabled= {this.disableReject()} >
            Reject
          </Button>
          &nbsp;&nbsp;&nbsp;

          <DropdownButton bsStyle={'success'} title={'Offer'} id={'Accept'}>
            {menuItems}
          </DropdownButton>
        </div>
      )
    }

    return (
      <div>
        <h4> {requestTrip['user_name']} </h4>
        <b> {requestTrip['number_of_paxs']} </b> Tickets
        between {requestTrip.fromHour()} - {requestTrip.toHour()}
        at <TimeAgo date={requestTrip['created_at']} />
        <br/>
        {opeartorCTA}
        <br />
        {actions}
        <hr />
      </div>

    )
  }
}
