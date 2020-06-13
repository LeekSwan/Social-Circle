import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reldaaasdasf.


//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class getPostgres extends React.Component {

    constructor(props) {
        super(props);
        this.state = { persons: ['placeholder name']}

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

    // componentDidMount() {
    //     console.log('componentDidMount: start');
    //     console.log('componentDidMount: end');
    // }

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
