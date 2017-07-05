import React    from 'react'
import { Link } from 'react-router-dom'

export default class PassengerAppLayout extends React.Component {

  render(){
    return (
      <div>
        <h3>Passenger App</h3>
        <ul className='main-nav clearfix'>
          <li><Link to='/bus5/search'>Search trip</Link></li>
          <li><Link to='/bus5/profile'>My Profile</Link></li>
          <li><Link to='/bus5/logout'>Logout</Link></li>

        </ul>
        
        <div>
         {this.props.children}
        </div>

        <div className='clearfix'>
          Footer
        </div>
      </div>
    )
  }
}
