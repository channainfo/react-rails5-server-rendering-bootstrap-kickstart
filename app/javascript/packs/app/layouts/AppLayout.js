import React from 'react'
import Me                 from '../models/Me'
import OperatorAppLayout  from './OperatorAppLayout'
import PassengerAppLayout from './PassengerAppLayout'

export default class AppLayout extends React.Component {

  render(){
    if(Me.isOperatorUser())
      return ( <OperatorAppLayout>{this.props.children}</OperatorAppLayout>)
    else
      return ( <PassengerAppLayout>{this.props.children}</PassengerAppLayout>)
  }
}
