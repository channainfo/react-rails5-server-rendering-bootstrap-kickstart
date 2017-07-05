import React from 'react'
import {
  BrowserRouter as Router, Switch
} from 'react-router-dom'

import PrivateRoute    from './routes/PrivateRoute'
import SessionRoute    from './routes/SessionRoute'
import LayoutRoute     from './routes/LayoutRoute'

import RequestSummaryComp      from './components/operator/RequestSummaryComp'
import RequestTripDetailComp   from './components/operator/RequestTripDetailComp'

import SearchTripComp          from './components/passenger/SearchTripComp'
import AcceptTripBus5Comp      from './components/passenger/AcceptTripBus5Comp'
import AcceptTripComp          from './components/passenger/AcceptTripComp'

import HomeComp                from './components/shared/HomeComp'
import LoginComp               from './components/shared/LoginComp'
import LoggedOutComp           from './components/shared/LoggedOutComp'
import ProfileComp             from './components/shared/ProfileComp'

import NotFoundComp            from './components/error/NotFoundComp'

const App = () => (
  <Router>
    <div>
      <Switch>
        <SessionRoute path="/login" component={LoginComp} layout='LoginLayout' />
        <LayoutRoute path="/logout" component={LoggedOutComp} layout='AppLayout' />

        <PrivateRoute exact path="/" component={HomeComp} layout='AppLayout'/>
        <PrivateRoute path="/request-summary" component={RequestSummaryComp} layout='AppLayout' />
        <PrivateRoute path="/search/:originId?/:destinationId?/:numberOfPaxs?/:onDate?/:onDate?" component={SearchTripComp} layout='AppLayout'/>
        <PrivateRoute path="/profile" component={ProfileComp} layout='AppLayout'/>
        <PrivateRoute path="/request-detail/:onDate/:routeId" component={RequestTripDetailComp} layout='AppLayout'/>
        <PrivateRoute path="/accept-trip-bus5/:offerResponseId" component={AcceptTripBus5Comp} layout='AppLayout' />
        <PrivateRoute path="/accept-trip/:requestTripId/:tripId" component={AcceptTripComp} layout='AppLayout' />
        <LayoutRoute  component={NotFoundComp} />
      </Switch>

    </div>
  </Router>
)

export default App

// {
//   "request_trip_id": 407,
//   "trip_id": 1,
//   "operator_id": 1,
//   "reply_to_offer_id": 180,
//   "status": "accepted"
// }
// /accept-trip/1/407/180
