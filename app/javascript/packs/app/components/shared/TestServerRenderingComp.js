import React from 'react'

//<%= react_component("shared/TestServerRenderingComp", { greeting: "BookMeBus App" }) %>
export default class TestServerRenderingComp extends React.Component {

  render() {
    return(
      <div>
        <h3>Hi {this.props.greeting}</h3>
      </div>
    )
  }
}
