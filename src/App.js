import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import './shards-dashboard/styles/shards-dashboards.1.1.0.min.css'

export default function App() {
  return (
    <Router>
      <div>
        {routes.map((route, index) => {
          return (
            <Route
              key={String(index)}
              path={route.path}
              exact={route.exact}
              component={props => {
                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                )
              }}
            />
          )
        })}
      </div>
    </Router>
  )
}