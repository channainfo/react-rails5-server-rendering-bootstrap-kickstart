import React from 'react'

import { CSSTransitionGroup } from 'react-transition-group'

import DateUtil               from '../../lib/DateUtil'
import RealtimeConnector      from '../../models/RealtimeConnector'
import RealtimeSummary        from '../../models/operator/RealtimeSummary'
import RequestSummaryItemComp from './RequestSummaryItemComp'

class RequestSummaryComp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      realtimeSummary: {

      }
    }
  }

  summaryDate(){
    return DateUtil.defaultChannelDate()
  }

  componentWillMount() {
    RealtimeConnector.init()
  }

  componentDidMount() {
    RealtimeSummary.readOptions(this.summaryDate()).read((snapshotValue) => {
      this.updateSummaryState(snapshotValue)
    })
  }

  updateSummaryState(values) {
    console.log("realtimeSummary: ", values);
    this.setState( {realtimeSummary: values } )
  }

  render() {
    var requestSummary = this.state.realtimeSummary;
    var onDate = this.summaryDate()
    var requestTrips = Object.keys(requestSummary).map((key)=> {
                        return (
                          <RequestSummaryItemComp key={key}
                                               requestTrip={requestSummary[key]}
                                               onDate={onDate}
                                               routeId={key} />
                        )
                      })

    return (
      <div>
        <h4>Request trip Summary</h4>
        <hr />
        <CSSTransitionGroup transitionName="request-summary"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}>
          <div>
            {requestTrips}
          </div>


        </CSSTransitionGroup>

      </div>
    )
  }
}

export default RequestSummaryComp;
