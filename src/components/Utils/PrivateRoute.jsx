import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { routes } from '../../routes'

export const PrivateRoute = ({ component: Component, authed, ...rest }) => (
   <Route
      {...rest}
      render={props => (
         authed
            ? <Component {...props} />
            : <Redirect to={routes.app} />
      )}
   />
)
