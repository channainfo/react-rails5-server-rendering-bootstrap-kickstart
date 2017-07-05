import React from 'react'

import { Thumbnail } from 'react-bootstrap'

export default class OperatorTripComp extends React.Component {

  render(){
    var tripDelegate = this.props.tripItem
    var trip = tripDelegate.object()

    var reason = tripDelegate.serviceAvailable() ? <i></i> : <i> {tripDelegate.notAvailableReason()} <br/> </i>

    var featured = trip.is_bus5 ? <span className='label label-danger'>Bus5</span> : <span></span>

    return (
      <div>
        <Thumbnail src={trip.operator.logo.medium} alt={trip.operator.name}>
          <h4>{trip.operator.name} - ID Ref: {trip.trip_id}</h4>
          <p>{trip.operator.address}</p>
          <p>Depart: {tripDelegate.departureTime()} -> {tripDelegate.arrivalTime()}</p>
          <p>Seat remaining: {trip.seats_remaining}</p>
          <p>Vehicle: {trip.vehicle_type.name}</p>
          <p>Amenities: {trip.vehicle_type.amenities.map((amenity)=> (<span key={amenity}> <span className='label label-info'>{amenity}</span> </span> ))} </p>
          <p>Price: <b>{trip.currency_type}</b> {tripDelegate.price()}</p>

          <p>{featured}</p>
          {reason}
        </Thumbnail>
      </div>
    )
  }
}
