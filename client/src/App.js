import React from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Home from './components/common/Home'
import NavBar from './components/common/NavBar'
import List from './components/task/List'
import EventCalender from './components/task/EventCalender'
import Create from './components/task/Create'
import UserProfile from './components/task/userProfile'



function App() {
  return (
    <Router>
      <div>

        <NavBar />
        {/* <UserProfile /> */}

        {/* <h2>ToDo App</h2> |
        <Link to="/" >Home</Link> |
        <Link to="/tasks" >Tasks</Link> |
        <Link to ="/activities">Activities</Link> */}
        
        <div>      
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/tasks" component={List} />
            <Route exact path="/tasks/new" component={Create} />
            <Route exact path="/activities" component={EventCalender} />
          </Switch>
        </div>

      </div>
    </Router>
  )
}

export default App
