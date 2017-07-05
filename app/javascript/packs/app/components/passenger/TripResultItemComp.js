import React from 'react'
import { Redirect } from 'react-router-dom'

import { Col, Thumbnail, Button } from 'react-bootstrap'

import PassengerResponseTrip from '../../models/passenger/ResponseTrip'

import loading from '../../images/loading.gif'

export default class TripResultItemComp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      acceptedOffer: false
    }
  }

  acceptOffer() {
    var options   = this.responseOptions()
    options['status'] = PassengerResponseTrip.ACCEPTED
    console.log("accept offer: ------------- ", options);

    PassengerResponseTrip.request(options, (jsonResponse) => {
      this.updateStateAcceptedOffer(jsonResponse)
    })
  }

  updateStateAcceptedOffer(jsonResponse) {
    console.log("json Response ---------------: ", jsonResponse);
    this.setState({
      acceptedOffer: true,
    })
  }

  rejectOffer() {
    var options   = this.responseOptions()
    options['status'] = PassengerResponseTrip.REJECTED
    console.log("reject offer: ------------- ", options);
  }

  responseOptions(){
    let tripDelegate = this.props.tripDelegate

    var options = {
      request_trip_id: this.props.requestTripId,
      trip_id: tripDelegate.object().trip_id,
      operator_id: tripDelegate.object().operator.id
    }

    if(tripDelegate.object().is_bus5) {
      var responseOffer = tripDelegate.findResponse(this.props.responses)
      options['reply_to_offer_id'] = responseOffer.id
    }

    return options
  }

  render(){

    if(this.state.acceptedOffer){
      let params = this.responseOptions()

      if(this.props.tripDelegate.object().is_bus5){
        return (
          <Redirect to={`/bus5/accept-trip-bus5/${params['reply_to_offer_id']}`} />
        )
      }
      else {
        return (<Redirect to={`/bus5/accept-trip/${params['request_trip_id']}/${params['trip_id']}`} />)
      }
    }

    let responses = this.props.responses
    var tripDelegate = this.props.tripDelegate
    var trip = tripDelegate.object()
    var featured = trip.is_bus5 ? <span key='bus5' className='label label-danger'>Bus5</span> : <span key='inventory'></span>
    var actions = null


    let responseStatus = tripDelegate.responseStatus(responses)

    if(responseStatus === 'waiting') {
      actions =  (
        <div style={ {clear: 'both'}}>
          Waiting for response
          <img src={loading} alt='loading' />
        </div>
      )
    }

    else if(responseStatus === "rejected") {
      actions = (
        <div style={ {clear: 'both', color: 'red'}}>
          Response Rejected
        </div>
      )
    }

    else if (responseStatus === 'accepted') {
      actions = ( <div style={ {clear: 'both'}}>
        <Button bsStyle="primary" onClick={() => {this.acceptOffer(trip.trip_id)}} >Accept</Button>&nbsp;
        <Button bsStyle="default" onClick={() => {this.rejectOffer(trip.trip_id)}} >Reject</Button>
      </div>)
    }

    else if (responseStatus === 'auto') {
      actions = ( <div style={ {clear: 'both'}}>
        <div>Gurantee</div>
        <Button bsStyle="primary" onClick={() => {this.acceptOffer(trip.trip_id)}} >Accept</Button>&nbsp;
        <Button bsStyle="default" onClick={() => {this.rejectOffer(trip.trip_id)}}>Reject</Button>
      </div>)
    }

    var responseOffer = tripDelegate.findResponse(this.props.responses)
    var price = null

    if(!trip.is_bus5 ){
      price = <div> Price: <b>{trip.currency_type} {tripDelegate.price()}  </b> </div>

    }

    else if (!responseOffer) {
      price =  <div> </div>
    }

    else {
      price =  <div> Price: <b> {"USD"} {responseOffer['data']['seats']['0']['price']} </b> </div>
    }

    return (
      <Col xs={6} md={4}>
        <Thumbnail src={trip.operator.logo.medium} alt={trip.operator.name}>
          <h3>{trip.operator.name}</h3>
          <p>{trip.operator.address}</p>

          <div> Seat remaining: {trip.seats_remaining}</div>
          <div>Vehicle: {trip.vehicle_type.name}</div>
          <div>{trip.vehicle_type.amenities.map((amenity)=> (<span key={amenity}> <span className='label label-info'>{amenity}</span> </span> ))}</div>
          {price}
          <div>{featured}</div>
          <br />
          {actions}
        </Thumbnail>
      </Col>
    )
  }
}
