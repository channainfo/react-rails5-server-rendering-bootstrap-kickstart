import React from 'react'
import { Media, Button } from 'react-bootstrap'

import ResponseTrip             from '../../models/passenger/ResponseTrip'
import OperatorResponseDelegate from '../../delegates/OperatorResponseDelegate'
import RequestTripDelegate      from '../../delegates/RequestTripDelegate'

export default class AcceptTripBus5Comp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      offerTrip: null
    }
  }

  componentWillMount() {
    let offerResponseId = this.props.match.params.offerResponseId
    ResponseTrip.offer(offerResponseId, (jsonResponse) => {
      this.updateOfferTrip(jsonResponse['data'])
    })
  }

  updateOfferTrip(responseTrip){
    console.log("offerTrip---", responseTrip);
    var operatorResponseDelegate = OperatorResponseDelegate.create(responseTrip)

    this.setState({
      offerTrip: operatorResponseDelegate
    })
  }

  componentDidMount() {

  }

  confirmPayment(){
    alert("confirm")
  }

  render() {
    var offerTrip = this.state.offerTrip
    if(!offerTrip)
      return <div> Loading ...</div>

    var requestTrip = RequestTripDelegate.create(offerTrip.object().request_trip)

    var trs = offerTrip.object().data['seats'].map((seat)=> {
      return (
        <tr key={seat.label}>
          <td>{seat.label}</td>
          <td>{seat.type}</td>
          <td>{seat.price}</td>
        </tr>
      )
    })

    return (
      <div>
        <h4>
          {offerTrip.object().origin.name} -> {offerTrip.object().destination.name}
        </h4>

        <p>
          Between  {requestTrip.fromHour()} - {requestTrip.toHour()},
          {requestTrip.object().number_of_paxs} Tickets
        </p>

        <div>


          <Media>
            <Media.Left align="top">
              <img src={offerTrip.object().operator.logo.medium} width={64} height={64}
                   alt={offerTrip.object().operator.name} />
            </Media.Left>

            <Media.Body>
              <Media.Heading>
                <a href={offerTrip.object().operator.website} >
                  {offerTrip.object().operator.name}
                </a>
              </Media.Heading>
              <p>
                Address: {offerTrip.object().operator.address}
              </p>

              <p>
                Note: {offerTrip.object().operator.notice}
              </p>
            </Media.Body>

          </Media>

          <h4>Offers</h4>
          <table className='table table-strip' >
            <thead>
              <tr>
                <td>Label</td>
                <td>Type</td>
                <td>Price</td>
              </tr>
            </thead>

            <tbody>
                {trs}
            </tbody>

          </table>

          <div>
            <Button onClick={()=> {this.confirmPayment()}} > Confirm Payment </Button>
          </div>
        </div>
      </div>
    )
  }
}
