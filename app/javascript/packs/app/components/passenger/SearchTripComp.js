import React from 'react'

import SearchBoxComp  from './SearchBoxComp'
import TripResultComp from './TripResultComp'

import SearchTrip                   from '../../models/SearchTrip'
import RealtimeConnector            from '../../models/RealtimeConnector'
import RealtimeOperatorResponseTrip from '../../models/passenger/RealtimeResponseTrip'

export default class SearchTripComp extends React.Component {
  constructor(props) {
    super(props)

    this.searchOptions = null
    this.state = {
      resultTrips: [],
      requestTripId: null,
      responseTrips: null
    }
  }

  componentWillMount(){
    console.log("Search trip will mount");
    console.log("props--------", this.props);
    RealtimeConnector.init()
  }

  render() {
    return (
      <div>
        <SearchBoxComp onSearchChange={(searchOptions)=>{this.onSearchBoxChange(searchOptions)}}
                       onSearchTripClick={(searchOptions) => {this.onSearchTripClick(searchOptions)}}
                       params={this.props.match.params}

                       />

        <TripResultComp trips={this.state.resultTrips}
                        responses={this.state.responseTrips}
                        requestTripId={this.state.requestTripId}
                      />
      </div>
    )
  }


  onSearchTripClick(searchOptions) {
    this.searchOptions = searchOptions
    SearchTrip.request(searchOptions, (jsonResponse)=>{
      this.updateTripResultState(jsonResponse)
    }, (error) => {
      console.log("response error:", error);
    })
  }

  updateResponseTrips(values){
    this.setState({responseTrips: values})
  }

  subscripeResponse() {
    let options = this.searchOptions
    options['request_trip_id'] = this.state.requestTripId

    RealtimeOperatorResponseTrip.readOptions(options).read((snapshotValue)=> {
      this.updateResponseTrips(snapshotValue)
    })

  }

  onSearchBoxChange(searchOptions){
    console.log("search options change", searchOptions);
  }

  componentDidMount(){
  }

  updateTripResultState(jsonResponse) {
    this.setState({resultTrips: jsonResponse['data'],
                   requestTripId: jsonResponse['meta'].request_trip_id})
    this.subscripeResponse()
  }

  showError(error) {
    console.log("error", error);
  }
}
