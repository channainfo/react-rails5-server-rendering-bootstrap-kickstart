import React   from 'react'
import {Route} from 'react-router-dom'
import Layouts from '../layouts/Layouts'

const LayoutRoute = ({ component: Component, layout: LayoutName, ...rest }) => {
  LayoutName = LayoutName || 'AppLayout'
  let Layout = Layouts[LayoutName]

  return <Route {...rest} render={ (props) => {
    return (
      <Layout>
        <Component {...props}/>
      </Layout>
    )
  }}
  />
}

export default LayoutRoute
