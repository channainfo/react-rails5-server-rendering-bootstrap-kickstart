import React from 'react'

export default class LoginLayout extends React.Component {
  render(){
    return (
      <div>
        <h3>Login panel</h3>
        <div>{this.props.children}</div>
        <div className='clearfix'>
          Footer
        </div>
      </div>
    )
  }
}
