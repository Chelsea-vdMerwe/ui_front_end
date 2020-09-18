import React, { Component} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import CreateContact from './components/createContact'
import EditContact from './components/editContact'
import SortedTable from './components/sortedTable'
import logo from './Phone_2.png'


const navStyle = {
  backgroundColor : '#f7f7f7',
  marginLeft : 50,
  marginRight: 50
}

const TableStyle ={
  marginTop : 20,
  marginLeft : 50,
  marginRight: 50
}

class App extends Component {


  render() {
    return (
      
      <Router>
          <div >
            <nav className="navbar navbar-expand-lg" style={navStyle}>
              <a className="navbar-brand">
                  <img 
                  src={logo}
                  alt="brand logo"
                  width="30"
                  height="40"
                  className="d-inline-block align-top">
                  </img>
                </a>
              <Link to="/" className="navbar-brand"></Link>
              <div className="collapse navbar-collapse">
              <ul className= "navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className= "nav-link">Contacts</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className= "nav-link">Create Contact</Link>
                </li>
              </ul >
              </div>
            </nav>
          
            <Route path="/" exact component={SortedTable}/>
            <Route path="/edit/" component={EditContact}/>
            <Route path="/create" component={CreateContact}/>
          </div>  
      </Router>
     
  );}
}

export default App;

