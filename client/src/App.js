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



class getPostgres extends React.Component{
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`/test`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      <ul>
        {this.state.persons.map(person => 
        <li>{person}</li>
        )}
        test
      </ul>
    )
  }
  
  

}
export default getPostgres;

