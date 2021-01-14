import React from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import Component1 from "./Component1"
import Component2 from "./Component2"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Component1} />
        <Route path="/hello-world" exact component={Component2} />
        <Route path="/hello-world/hey" exact component={Component2} />
      </Switch>
    </Router>
  )
}

export default App
