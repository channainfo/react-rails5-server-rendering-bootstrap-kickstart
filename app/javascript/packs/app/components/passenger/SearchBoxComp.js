import React from 'react'

import { ControlLabel, FormControl, Grid, Row, Col, Button } from 'react-bootstrap'

import Location   from '../../models/Location'
import DateUtil   from '../../lib/DateUtil'

export default class SearchBoxComp extends React.Component {
  constructor(props) {
    super(props)


    console.log("props search ----", this.props)
    let params = this.props.params
    this.state = {
      locations: [],
      originId: params['originId'] || 1,
      destinationId: params['destinationId'] || 5,
      numberOfPaxs: params['numberOfPaxs'] || 1,
      onDate: params['onDate'] || DateUtil.defaultSearchDate(),
      hours: params['hours'] || '5-10.75',
    }
  }

  optionsWithDefault(selectedItem){

    var options = this.state.locations.map((location) => {
      return (
        <option value={location.id} key={location.id}>
          {location.text}
        </option>
      )
    })
    return options
  }

  updateUIState(field, value){
    let updatedAttrs = {}
    updatedAttrs[field] = value
    this.setState(updatedAttrs)

    this.props.onSearchChange(this.searchOptions())
  }

  searchTrip(){
    this.props.onSearchTripClick(this.searchOptions())
  }

  searchOptions(){
    let options =  {
      origin_id: this.state.originId,
      destination_id: this.state.destinationId,
      number_of_paxs: this.state.numberOfPaxs,
      hours: this.state.hours,
      on_date: this.state.onDate
    }
    console.log("search options:", options)
    console.log("props: ------", this.props);
    return options
  }

  render(){
    return(
      <div className='SearchBox'>
        <h4>Find your cheapest ticket on Bus5</h4>
        <form>
          <Grid>
            <Row className="show-grid">
              <Col sm={6} md={2}>
                <ControlLabel>Origin</ControlLabel>
                <FormControl defaultValue={this.state.originId} componentClass="select" placeholder="Origin"
                             onChange={(e)=>{this.updateUIState('originId', e.target.value)}}>
                  {this.optionsWithDefault(this.state.originId)}
                </FormControl>

              </Col>

              <Col sm={6} md={2}>
                <ControlLabel>Destination</ControlLabel>
                <FormControl defaultValue={this.state.destinationId} componentClass="select" placeholder="Destination"
                             onChange={(e)=> {this.updateUIState('destinationId', e.target.value)}}>
                 {this.optionsWithDefault(this.state.destinationId)}
                </FormControl>
              </Col>


              <Col sm={3} md={1}>
                <ControlLabel>#Paxs</ControlLabel>
                <FormControl type="number"
                             label="Text"
                             onChange={(e) => {this.updateUIState('numberOfPaxs', e.target.value)}}
                             value={this.state.numberOfPaxs}/>
              </Col>

              <Col sm={3} md={1}>
                <ControlLabel>Hours</ControlLabel>
                <FormControl type="text"
                             label="Text"
                             placeholder="24"
                             onChange={(e) => {this.updateUIState('hours', e.target.value)}}
                             value={this.state.hours} />
              </Col>

              <Col sm={3} md={2}>
                <ControlLabel>On</ControlLabel>
                <FormControl type="text"
                             label="Text"
                             onChange={(e) => {this.updateUIState('onDate', e.target.value)}}
                             placeholder="DD/MM/YYYY"
                             value={this.state.onDate} />
              </Col>

              <Col sm={3} md={2}>
                <div><ControlLabel>&nbsp;</ControlLabel></div>
                <Button onClick={()=>{ this.searchTrip()}}> Search Availability</Button>
              </Col>
            </Row>
          </Grid>

        </form>
      </div>
    )
  }

  updateLocationsState(locations){
    var data = locations.map((location)=> {
      return { id: location.id,
               text: `${location.attributes['name']}-${location.attributes['name_khmer']}`
             }
    })
    this.setState({locations: data})
  }

  showError(error) {
    console.log("failed to load location with error:", error );
  }

  componentDidMount() {
    Location.request((jsonResponse) => {
      this.updateLocationsState(jsonResponse)
    }, (error) => {
      this.showError(error)
    })
  }
}
