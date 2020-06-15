import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class getPostgres extends React.Component {

    constructor(props) {
        super(props);
        this.state = { persons: ['placeholder name'] }

        this.handleClick = this.handleClick.bind(this); 
    }

    handleClick() {
        axios.get(`/test`)
            .then(res => {
                console.log('componentDidMount: axios.get(/test).then');
                console.log(res.data);
                const persons = res.data;
                this.setState({
                    persons: persons.map(person => person.firstname)
                });
        })
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    <div>
                        <button onClick={this.handleClick}>
                            <Link to="/">Click me</Link>
                        </button>
                        <ul>
                            { this.state.persons.map(person =>
                                <li>{person}</li>
                            ) }
                            test
                        </ul>
                        <button>
                            <Link to="/test1">Click me 1!</Link>
                        </button>

                        <button>
                            <Link to="/test2">Click me 2!</Link>
                        </button>

                        <switch>
                            <Route path="/test1">
                                    <Test1 />
                            </Route>
                            <Route path="/test2">
                                    <Test2 />
                            </Route>
                        </switch>
                    </div>
                </React.Fragment>
            </Router>
        );
    }

   
    
}


function Test1() {
    return <h2>Hello from test 1!</h2>
}

function Test2() {
    return <h2>Hello from test 2!</h2>;
}

export default getPostgres;
