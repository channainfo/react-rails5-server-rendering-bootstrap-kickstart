import React from 'react'

import { Grid, Row}           from 'react-bootstrap'
import TripResultItemComp     from './TripResultItemComp'
import StopTimeResultDelegate from '../../delegates/StopTimeResultDelegate'

export default class TripResultComp extends React.Component {


  render() {
    var resultTrips = this.props.trips.map((trip)=>{
      return (
        <TripResultItemComp key={trip.id}
                            requestTripId= {this.props.requestTripId}
                            tripDelegate={StopTimeResultDelegate.create(trip)}
                            responses={this.props.responses} />
      )
    })

    if(this.props.trips.length === 0) {
      return (
        <h2> No result</h2>
      )
    }
    else{
      return (
        <div>
          <h3>Search Result</h3>
          <Grid>
            <Row>
              {resultTrips}
            </Row>
          </Grid>
        </div>
      )
    }
  }


}
