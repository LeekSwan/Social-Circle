import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

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
            <React.Fragment>
                <button onClick={this.handleClick}>
                    Click me
                </button>
                <ul>
                    { this.state.persons.map(person =>
                        <li>{person}</li>
                    ) }
                    test
                </ul>
            </React.Fragment>
        );
    }
}
export default getPostgres;
