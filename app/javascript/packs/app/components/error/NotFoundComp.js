import React from 'react'
import { Link } from 'react-router-dom'

export default class NotFoundComp extends React.Component {
  render() {
    return(
      <div>
        <h3> Oop! 404</h3>
        <p style={ {textAlign: 'center'}}>
          You tried to access: <b>{this.props.location.pathname}</b> which does not exist.
          <br/>
          Make sure you type the correct address or the link is not dead.
          <br/>

          <Link to='/' className='' > Visit Home </Link>
        </p>

      </div>
    )
  }
}
