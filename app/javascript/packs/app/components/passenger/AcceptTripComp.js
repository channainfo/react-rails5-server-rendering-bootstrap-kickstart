import React from 'react'

import ResponseTrip from '../../models/passenger/ResponseTrip'

export default class AcceptTripComp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      offerTrip: null
    }
  }

  componentWillMount() {
    let offerTripId = this.props.match.params.responseOfferId
    ResponseTrip.offer(offerTripId, (jsonResponse) => {
      this.updateOfferTrip(jsonResponse)
    })
  }

  updateOfferTrip(jsonResponse){
    console.log("offerTrip---", jsonResponse);
    this.setState({
      offerTrip: jsonResponse
    })
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>

      </div>
    )
  }
}
