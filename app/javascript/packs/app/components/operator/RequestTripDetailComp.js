import React from 'react'

import RealtimeConnector         from '../../models/RealtimeConnector'
import RealtimeRequestTrip       from '../../models/operator/RealtimeRequestTrip'
import RealtimeResponseList      from '../../models/operator/RealtimeResponseList'

import TripAvailability          from '../../models/TripAvailability'
import Me                        from '../../models/Me'
import Location                  from '../../models/Location'

import RequestTripDetailItemComp from './RequestTripDetailItemComp'
import OperatorTripComp          from './OperatorTripComp'

import RequestTripDelegate       from '../../delegates/RequestTripDelegate'
import LocationDelegate          from '../../delegates/LocationDelegate'

export default class RequestTripDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      requestTrips: {},
      trips: [],
      operatorResponses: {}
    }
  }

  updateTripsState(trips){
    this.setState({trips: trips})
  }

  componentWillMount() {
    var params = this.props.match.params
    RealtimeConnector.init()

    var tripOptions = this.tripAvailabilityParams(params)
    TripAvailability.request(tripOptions, (jsonResponse)=>{
      this.updateTripsState(jsonResponse)
    }, (error)=>{
      console.log("console error-----", error);
    })
  }

  tripAvailabilityParams(params){
    var [year, month, day] = params['onDate'].split("-")
    var [originId, destinationId] = params['routeId'].split("_")
    var operatorId = Me.getCache().attributes['operator']['id']

    return {
      operator_id: operatorId,
      origin_id: originId,
      destination_id: destinationId,
      on_date: `${day}/${month}/${year}`
    }

  }

  componentDidMount() {
    var params = this.props.match.params

    RealtimeRequestTrip.readOptions(params).read((snapshotValue) => {
      this.updateRequestTripState(snapshotValue)
    })

    RealtimeResponseList.readOptions(params).read((snapshotValue) => {
      console.log("response list:--------------- ", snapshotValue);
      this.updateOperatorResponseList(snapshotValue)
    })
  }

  updateOperatorResponseList(values) {
    this.setState({operatorResponses: values})
  }

  updateRequestTripState(values) {
    this.setState({requestTrips: values})
  }

  origin(){
    let originId = this.props.match.params['routeId'].split("_")[0]
    let location =  Location.getCache().filter((location)=> {
      return location.id === originId
    })[0]

    return LocationDelegate.create(location)
  }

  destination(){
    let destinationId = this.props.match.params['routeId'].split("_")[1]
    let location =  Location.getCache().filter((location)=> {
      return location.id === destinationId
    })[0]

    return LocationDelegate.create(location)
  }

  render() {
    let originLocation = this.origin()
    let destinationLocation   = this.destination()

    var trips = this.state.trips.map((tripItem)=> {
      return(
        <OperatorTripComp key={tripItem.id} tripItem={tripItem} />
      )
    })

    var requestTrips = Object.keys(this.state.requestTrips).map((requestTripId)=> {
                        let responseToKey = `request_id-${requestTripId}`
                        let operatorResponse = this.state.operatorResponses[responseToKey]
                        return (
                          <RequestTripDetailItemComp key={requestTripId}
                                                     trips={this.state.trips}
                                                     operatorResponse={operatorResponse}
                                                     requestTripParams={this.props.match.params}
                                                     requestTrip={RequestTripDelegate.create(this.state.requestTrips[requestTripId])} />
                        )
                })


    return (
      <div>
        <div style={{textAlign: 'center'}}>
          <h4>
            Trip {originLocation.object().name} -> {destinationLocation.object().name}
          </h4>
          <i>{this.props.match.params['onDate']}</i>
        </div>

        {trips}
        <h4>User Request</h4>
        {requestTrips}
      </div>
    )
  }
}
